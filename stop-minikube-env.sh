#!/bin/bash
set -e
# -----------------------------------------------------------
#  Stop Minikube + Ingress tunnel and close browser tab
#  (Mac-compatible)
# -----------------------------------------------------------

APP_URL="http://dashboard-app.net"

echo "🧹 Closing browser tab for $APP_URL..."
osascript <<EOF
tell application "Google Chrome"
    set windowList to every window
    repeat with aWindow in windowList
        set tabList to every tab of aWindow
        repeat with atab in tabList
            if (URL of atab starts with "$APP_URL") then
                close atab
            end if
        end repeat
    end repeat
end tell
EOF

echo "🧹 Stopping Minikube tunnel..."
pkill -f "minikube tunnel" || true

echo "🛑 Stopping Minikube cluster..."
minikube stop

echo "💤 Browser closed, tunnel stopped, and Minikube shut down."
echo "✅ Next time, just run ./start-minikube-env.sh"
