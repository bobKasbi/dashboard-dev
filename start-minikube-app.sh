#!/bin/bash
set -e
# -----------------------------------------------------------
#  Start Minikube + Docker + Ingress tunnel for dashboard-app
#  (Mac-compatible; opens browser automatically)
# -----------------------------------------------------------

APP_URL="http://dashboard-app.net"
TUNNEL_PID_FILE="$HOME/.minikube/tunnel.pid"

echo "🚀 Starting Minikube..."
minikube start

echo "🔍 Enabling required addons..."
minikube addons enable ingress >/dev/null 2>&1 || true
minikube addons enable ingress-dns >/dev/null 2>&1 || true

echo "⏳ Waiting for cluster to be ready..."
kubectl wait --for=condition=Ready nodes --all --timeout=120s >/dev/null 2>&1 || true

echo "⚙️  Ensuring /etc/hosts contains dashboard-app.net ..."
if ! grep -q "dashboard-app.net" /etc/hosts; then
  echo "127.0.0.1 dashboard-app.net" | sudo tee -a /etc/hosts >/dev/null
  echo "✅ Added hosts entry."
else
  echo "✅ Hosts entry already exists."
fi

echo "🔐 Checking sudo access (you may be prompted once)..."
sudo -v

# If a previous tunnel is still alive, kill it
if [ -f "$TUNNEL_PID_FILE" ] && ps -p "$(cat "$TUNNEL_PID_FILE")" >/dev/null 2>&1; then
  echo "🧹 Stopping previous tunnel..."
  sudo kill "$(cat "$TUNNEL_PID_FILE")" || true
  rm -f "$TUNNEL_PID_FILE"
fi

echo "🌐 Starting minikube tunnel in background..."
sudo minikube tunnel --bind-address 127.0.0.1 > ~/.minikube/tunnel.log 2>&1 &
echo $! > "$TUNNEL_PID_FILE"

sleep 8

echo "✅ Tunnel started (PID $(cat "$TUNNEL_PID_FILE"))."
echo "🌍 Opening browser at $APP_URL ..."
open "$APP_URL"

echo
echo "🧹 To stop later run:"
echo "    sudo kill \$(cat $TUNNEL_PID_FILE) && rm -f $TUNNEL_PID_FILE && minikube stop"
