# TasteMatch - Restaurant Discovery App

Eine moderne Plattform zur Entdeckung von Restaurants mit Tinder-ähnlicher Swipe-Funktion, intelligenten Allergie-Filtern und echten Nutzerbewertungen.

## 🌐 Live-Version

**👉 [TasteMatch jetzt online öffnen](https://tastematch.vercel.app)** 👈

> Vollständig funktionsfähig, keine Installation nötig!

---

## Features

### 🔍 Allergie-Filtering
- Umfangreiche Allergie-Datenbank (Gluten, Nüsse, Milchprodukte, etc.)
- Schnelle Filter-Optionen
- Restaurants zeigen ihre Allergie-Sicherheit an

### 💬 Swipe-Funktion
- Tinder-ähnliche Bedienung
- Restaurants in der Nähe nach Standort
- Like/Dislike für Favoriten

### 🗺️ Google Maps Integration
- Echtzeit-Standorterkennung
- Entfernungs-Anzeige
- Routenplanung zu Restaurants

### ⭐ Bewertungen & Kommentare
- Nur echte Bewertungen von verifizierten Essern
- Foto-Upload von Gerichten
- Allergie-relevante Kommentare

### ✅ Restaurant-Verifizierung
- Restaurants müssen sich registrieren & verifizieren
- Sicherheitscheck für Allergie-Informationen
- Verifizierungs-Badge anzeigen

## Installation

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
npm start
```

## Umgebungsvariablen

Erstellen Sie `.env` Dateien:

**frontend/.env:**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_KEY=YOUR_KEY
REACT_APP_FIREBASE_CONFIG=YOUR_CONFIG
```

**backend/.env:**
```
PORT=5000
FIREBASE_API_KEY=YOUR_KEY
GOOGLE_MAPS_KEY=YOUR_KEY
```

## 📚 Dokumentation

- [**START HIER** - Überblick & Quick Links](00_START_HIER.md)
- [Quick Start Guide](QUICK_START.md)
- [Deployment Guide](docs/DEPLOYMENT.md) - **Veröffentlichung der App**
- [API Dokumentation](docs/API.md)
- [Architektur](docs/ARCHITECTURE.md)
- [Datenbank-Schema](docs/DATABASE_SCHEMA.md)
- [Implementation Report](IMPLEMENTATION_REPORT.md)

## 🚀 Schneller Start

### Option 1: Online testen (keine Installation!)
```
Öffnen Sie: https://tastematch.vercel.app
```

### Option 2: Lokal ausführen
```bash
# Repository klonen
git clone https://github.com/yourusername/tastematch.git
cd tastematch

# Mit Python starten (Windows)
python -m http.server 8000

# Dann öffnen: http://localhost:8000
```

### Option 3: Mit Docker
```bash
docker run -p 8000:8000 yourusername/tastematch:latest
```

## 🌍 Deployment-Optionen

| Plattform | Kosten | Setup-Zeit | Best für |
|-----------|--------|-----------|----------|
| **Vercel** | Kostenlos | 5 Min | ⭐ Empfohlen |
| **Netlify** | Kostenlos | 5 Min | Alternative |
| **GitHub Pages** | Kostenlos | 10 Min | Einfach |
| **Docker** | Variabel | 15 Min | Production |
| **Railway** | $5/Monat | 10 Min | Modern |

**[👉 Vollständiger Deployment Guide hier](docs/DEPLOYMENT.md)**

## Struktur

- **frontend/src** - React Komponenten, Hooks, Pages
- **backend/src** - Express Routes, Middleware, Database

## Lizenz
MIT
