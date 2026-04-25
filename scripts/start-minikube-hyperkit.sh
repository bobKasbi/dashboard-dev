#!/bin/bash
set -euo pipefail

# Start HyperKit-based Minikube with sane defaults
minikube start --driver=hyperkit --cpus=4 --memory=8192 --disk-size=40g

# Wait for node to become ready
kubectl wait --for=condition=Ready node/minikube --timeout=90s

# Enable ingress if not already
minikube addons enable ingress

# Start tunnel in background (logs redirected)
# nohup minikube tunnel > /tmp/minikube-tunnel.log 2>&1 &

