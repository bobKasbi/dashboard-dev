#!/usr/bin/env bash
set -e

# Ensure tag exists
RAW_TAG="$CI_COMMIT_TAG"
if [ -z "$RAW_TAG" ]; then
  echo "ERROR: CI_COMMIT_TAG is empty. This job must run only on tags."
  exit 1
fi

# Strip leading "v"
VERSION="${RAW_TAG#v}"
echo "Using version: $VERSION"

# --- Update package.json without jq (using Node.js) ---
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json'));
  pkg.version = '$VERSION';
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"
echo "✅ Updated package.json to $VERSION"

# --- Update Chart.yaml (portable sed) ---
sed -i"" "s/^version:.*/version: $VERSION/" charts/Chart.yaml
sed -i"" "s/^appVersion:.*/appVersion: \"$VERSION\"/" charts/Chart.yaml
echo "✅ Updated charts/Chart.yaml to $VERSION"

# Commit changes back to main
git config user.email "ci-bot@gitlab.com"
git config user.name "Version Sync Bot"

git add package.json charts/Chart.yaml
git commit -m "chore: sync version to $VERSION [skip ci]" || echo "ℹ️ Nothing to commit"
git push origin HEAD:main

echo "✅ Version sync completed and pushed to main"