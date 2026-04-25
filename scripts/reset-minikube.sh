#!/bin/bash
echo "⚙️  Minikube full reset utility"

read -p "⚠️  This will DELETE your current Minikube cluster and recreate kubeconfig. Continue? (y/N): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "❌ Aborted. Nothing was deleted."
  exit 0
fi

echo "🧹 Deleting existing Minikube cluster..."
minikube delete --yes || true

echo "🗄️  Backing up and removing old kubeconfig..."
mkdir -p ~/Dev/BACKUPS/kube
cp ~/.kube/config ~/Dev/BACKUPS/kube/config_$(date +%Y-%m-%d_%H-%M-%S).broken 2>/dev/null || true
rm -f ~/.kube/config

echo "🚀 Starting a fresh Minikube cluster..."
minikube start --memory=8192 --cpus=4

echo "🔐 Recreating GitLab Docker registry secret..."
kubectl create secret docker-registry gitlab-auth \
  --docker-server=registry.gitlab.com \
  --docker-username=bobKasbi \
  --docker-password='glpat-RQ8dBx4Skqu2B7QTgL0TAG86MQp1OjY2dzNwCw.01.121iqrfno' \
  --docker-email=wikkicode@gmail.com

echo "🌐 Enabling ingress addon..."
minikube addons enable ingress

echo "✅ Done."
echo "💡 Next steps:"
echo "1️⃣ Run:  minikube tunnel  (keep it open)"
echo "2️⃣ Verify with: kubectl get nodes"
echo "3️⃣ Redeploy your UI and Keycloak apps"
