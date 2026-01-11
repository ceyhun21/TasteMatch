#!/bin/bash

# TasteMatch Deployment Setup Script
# Für Linux und macOS

echo "🚀 TasteMatch Deployment Setup"
echo "================================"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm ist nicht installiert!"
    echo "Installieren Sie Node.js von https://nodejs.org"
    exit 1
fi

echo "✅ Node.js und npm gefunden"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installiere Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI bereit"
echo ""

# Ask user what they want to do
echo "Was möchten Sie tun?"
echo "1) Lokal testen (http://localhost:8000)"
echo "2) Zu Vercel deployen"
echo "3) Docker Image bauen"
echo "4) Setup abbrechen"
echo ""

read -p "Wählen Sie eine Option (1-4): " choice

case $choice in
    1)
        echo "🚀 Starte lokalen Server auf Port 8000..."
        python3 -m http.server 8000
        ;;
    2)
        echo "🌐 Deploye zu Vercel..."
        vercel --prod
        ;;
    3)
        echo "🐳 Baue Docker Image..."
        docker build -t tastematch:latest .
        echo "✅ Image erstellt!"
        echo "Starten Sie mit:"
        echo "  docker run -p 8000:8000 tastematch:latest"
        ;;
    4)
        echo "👋 Abgebrochen"
        exit 0
        ;;
    *)
        echo "❌ Ungültige Auswahl"
        exit 1
        ;;
esac
