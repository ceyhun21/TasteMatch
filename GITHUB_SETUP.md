# 🔗 GitHub Integration für TasteMatch

**Datum:** 11. Januar 2026  
**Status:** Bereit für GitHub-Verbindung

---

## 🚀 Schritt-für-Schritt Guide: GitHub Setup

### **Phase 1: GitHub Repository erstellen**

#### **1. GitHub Account & Repository**

```bash
# Anmelden auf GitHub (falls nicht vorhanden)
https://github.com/signup

# Neues Repository erstellen:
https://github.com/new

Optionen:
✓ Repository Name: "tastematch" oder "tastematch-app"
✓ Beschreibung: "Restaurant Discovery App with Swipe Function & Allergy Filtering"
✓ Public (damit andere sehen können)
✓ Add .gitignore: Node (wird automatisch hinzugefügt)
✓ Add License: MIT
✓ ✓ Create repository
```

---

### **Phase 2: Lokales Git Setup**

#### **2. Git Initialisieren (lokal)**

```bash
# Ins Verzeichnis wechseln
cd "C:\Users\topraksuyu\Desktop\BHT\TasteMatch 11.1"

# Git Repository initialisieren
git init

# .gitignore erstellen (siehe unten)
echo # .gitignore content

# Alle Dateien hinzufügen (außer .gitignore exclusions)
git add .

# Commit erstellen
git commit -m "Initial commit: TasteMatch v1.0.0 - Restaurant Discovery App"

# Lokal überprüfen
git log
git status
```

---

### **Phase 3: Mit GitHub verbinden**

#### **3. Remote Repository hinzufügen**

```bash
# GitHub Repository URL ermitteln
# Format: https://github.com/[DEIN_USERNAME]/tastematch.git

# Remote origin hinzufügen
git remote add origin https://github.com/[DEIN_USERNAME]/tastematch.git

# Optional: SSH statt HTTPS (wenn SSH-Key konfiguriert)
git remote add origin git@github.com:[DEIN_USERNAME]/tastematch.git

# Verbindung überprüfen
git remote -v

# Output sollte sein:
# origin  https://github.com/[USERNAME]/tastematch.git (fetch)
# origin  https://github.com/[USERNAME]/tastematch.git (push)
```

---

### **Phase 4: Code zu GitHub pushen**

#### **4. Erstes Push zum Main Branch**

```bash
# Branch umbenennen von "master" zu "main" (GitHub Standard)
git branch -M main

# Zu GitHub pushen
git push -u origin main

# Bei Authentifizierung:
# - Token erstellen unter: https://github.com/settings/tokens
# - Generate new token (classic)
# - Scopes: repo, workflow
# - Token in Terminal einfügen, wenn aufgefordert

# Überprüfen auf GitHub
# https://github.com/[USERNAME]/tastematch
```

---

## 📁 .gitignore - Dateien ausschließen

```text
# Dependencies
node_modules/
npm-debug.log
yarn-error.log
package-lock.json

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
*.tsbuildinfo

# IDE & Editor
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# OS
Thumbs.db
.DS_Store

# Firebase
.firebaserc
firebase-debug.log

# Testing
coverage/
.nyc_output/

# Temp files
*.tmp
*.temp

# Python
__pycache__/
*.py[cod]
*$py.class

# Docker
.docker/
```

---

## 🔐 GitHub & Git Authentifizierung

### **Option 1: HTTPS mit Personal Access Token (Empfohlen für anfänger)**

```bash
# 1. Token erstellen
https://github.com/settings/tokens

# 2. "Generate new token" → "Generate new token (classic)"
# 3. Name: "tastematch-github"
# 4. Scopes:
#    ✓ repo (vollständig)
#    ✓ workflow (für GitHub Actions)
#    ✓ gist
# 5. Generate token → Token kopieren

# 3. Git konfigurieren
git config --global user.name "Dein Name"
git config --global user.email "deine@email.com"

# 4. Beim Push: Token als Passwort verwenden
git push -u origin main
# Username: [DEIN_GITHUB_USERNAME]
# Password: [DEIN_TOKEN]
```

### **Option 2: SSH mit SSH-Key (Für Profis)**

```bash
# 1. SSH-Key generieren (falls nicht vorhanden)
ssh-keygen -t ed25519 -C "deine@email.com"
# Dateiname: id_ed25519
# Passphrase: [optional]

# 2. Public Key zu GitHub hinzufügen
# Datei öffnen: C:\Users\[USERNAME]\.ssh\id_ed25519.pub
# https://github.com/settings/ssh/new
# Key einfügen

# 3. SSH Connection testen
ssh -T git@github.com
# Output: Hi [USERNAME]! You've successfully authenticated...

# 4. Remote mit SSH URL
git remote set-url origin git@github.com:[USERNAME]/tastematch.git

# 5. Pushen ohne weitere Authentifizierung
git push -u origin main
```

---

## 📊 GitHub Repository-Struktur

```
tastematch/
├── .github/
│   └── workflows/
│       ├── deploy.yml (CI/CD)
│       └── tests.yml (Automatische Tests)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── src/
│   ├── package.json
│   └── README.md
├── docs/
│   ├── API.md
│   ├── DATABASE_SCHEMA.md
│   └── ARCHITECTURE.md
├── .gitignore
├── README.md
├── LICENSE (MIT)
└── vercel.json
```

---

## ✨ Repository-Einstellungen (auf GitHub)

### **1. Branch Protection (Main)**

```
https://github.com/[USERNAME]/tastematch/settings/branches

✓ Branch name pattern: main
✓ Require pull request reviews before merging
✓ Require status checks to pass
✓ Require branches to be up to date
```

### **2. Secrets für CI/CD**

```
https://github.com/[USERNAME]/tastematch/settings/secrets/actions

Secrets hinzufügen:
- FIREBASE_CONFIG (Firebase JSON)
- VERCEL_TOKEN (zum Deploy)
- GITHUB_TOKEN (automatisch vorhanden)
```

### **3. Webhook für Auto-Deploy**

```
Vercel automatisch verbinden:
1. https://vercel.com/import
2. GitHub Repository wählen
3. Deploy
4. Bei jedem Push: Auto-Deploy
```

---

## 🔄 Täglicher Workflow

### **Änderungen machen und pushen:**

```bash
# 1. Änderungen machen
# - Dateien editieren
# - Testen

# 2. Status überprüfen
git status

# 3. Änderungen staged
git add .

# 4. Commit mit Nachricht
git commit -m "feat: Add new feature"
# oder
git commit -m "fix: Fix bug in login"
# oder
git commit -m "docs: Update README"

# 5. Zu GitHub pushen
git push origin main

# 6. Auf GitHub überprüfen
# https://github.com/[USERNAME]/tastematch

# Optional: Pull Request erstellen
# https://github.com/[USERNAME]/tastematch/pulls
```

---

## 🌳 Branches für Teamarbeit (Optional)

```bash
# Feature Branch erstellen
git checkout -b feature/new-feature
# Änderungen machen
git commit -m "feat: Add new feature"
git push origin feature/new-feature

# Auf GitHub: Pull Request (PR) erstellen
# Team reviewt Code
# PR mergen in main

# Nach Merge: Local Branch löschen
git branch -d feature/new-feature
```

---

## 🤖 GitHub Actions (CI/CD)

### **Auto-Deploy auf Vercel mit GitHub Actions**

Datei: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📋 Komplette Checkliste

```
[ ] GitHub Account erstellt
[ ] Repository "tastematch" erstellt
[ ] Git lokal initialisiert (git init)
[ ] .gitignore erstellt
[ ] Alle Dateien staged (git add .)
[ ] Initialer Commit gemacht (git commit -m "...")
[ ] Remote origin hinzugefügt (git remote add origin ...)
[ ] Main branch renamed (git branch -M main)
[ ] Zu GitHub gepusht (git push -u origin main)
[ ] Auf GitHub überprüfen ✓
[ ] Repository beschreibung aktualisiert
[ ] README.md hinzugefügt
[ ] LICENSE (MIT) hinzugefügt
[ ] Topics hinzugefügt: React, Firebase, Tailwind CSS, Vite
[ ] GitHub Pages aktivieren (optional)
[ ] GitHub Actions aktivieren (für CI/CD)
```

---

## 🎯 Nächste Schritte

### **Kurz-fristig (Heute):**
1. ✅ GitHub Account + Repository erstellen
2. ✅ Git initialisieren
3. ✅ Mit GitHub verbinden
4. ✅ Zum main Branch pushen

### **Mittel-fristig (Diese Woche):**
1. GitHub Actions für Auto-Deploy
2. Branch Protection aktivieren
3. README.md dokumentieren
4. GitHub Issues erstellen (Roadmap)

### **Lang-fristig (Diese Woche+):**
1. Teamarbeit mit Git Branches
2. Pull Requests & Code Reviews
3. GitHub Discussions aktivieren
4. Release Notes automatisieren

---

## 📞 Schnelle Links

| Link | Beschreibung |
|------|-------------|
| [GitHub.com](https://github.com) | GitHub Hauptseite |
| [New Repository](https://github.com/new) | Neues Repo erstellen |
| [Tokens](https://github.com/settings/tokens) | Personal Access Token |
| [SSH Keys](https://github.com/settings/ssh/new) | SSH Keys hinzufügen |
| [TasteMatch Repo](https://github.com/[USERNAME]/tastematch) | Dein Repository (nach Erstellen) |

---

## 🐛 Häufige Fehler & Lösungen

### **Fehler: "fatal: remote origin already exists"**
```bash
# Lösung:
git remote remove origin
git remote add origin https://github.com/[USERNAME]/tastematch.git
```

### **Fehler: "Authentication failed"**
```bash
# Lösung: Token neu generieren
https://github.com/settings/tokens

# Oder SSH verwenden
git remote set-url origin git@github.com:[USERNAME]/tastematch.git
```

### **Fehler: "Permission denied (publickey)"**
```bash
# Lösung: SSH-Key überprüfen
ssh -T git@github.com

# Falls nicht funktioniert: SSH-Key neu generieren
ssh-keygen -t ed25519 -C "deine@email.com"
```

### **Fehler: "branch 'main' does not exist"**
```bash
# Lösung: Branch lokal erstellen
git branch -M main
git push -u origin main
```

---

**Status:** ✅ Bereit zum GitHub-Connect!  
**Letztes Update:** 11. Januar 2026

