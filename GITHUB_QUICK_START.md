# 🔗 GitHub Integration - Schritt für Schritt

**TasteMatch mit GitHub verbinden** - Januar 2026

---

## ✅ Was du bekommen hast:

1. **GITHUB_SETUP.md** - Kompletter Guide (detailliert)
2. **GITHUB_SETUP.bat** - Automatisiertes Setup-Skript
3. **GitHub Actions Workflow** - Auto-Deploy konfiguriert

---

## 🚀 Schnelstart (5 Minuten)

### **Option 1: Automatisiert mit Skript**

```bash
# 1. Terminal öffnen
cd "C:\Users\topraksuyu\Desktop\BHT\TasteMatch 11.1"

# 2. Skript ausführen
GITHUB_SETUP.bat

# 3. Anweisungen folgen
# - GitHub URL eingeben
# - Commit Message eingeben
# - Push bestätigen
```

### **Option 2: Manuell (Schnellversion)**

```bash
# 1. GitHub Repository erstellen
https://github.com/new
# Name: tastematch
# Klick: "Create repository"

# 2. Git initialisieren
git init
git config user.name "Dein Name"
git config user.email "deine@email.com"

# 3. Mit GitHub verbinden
git remote add origin https://github.com/[DEIN_GITHUB_USERNAME]/tastematch.git

# 4. Zu GitHub pushen
git add .
git commit -m "Initial commit: TasteMatch v1.0.0"
git branch -M main
git push -u origin main

# FERTIG! 🎉
```

---

## 📋 Checkliste zum Abhaken

- [ ] GitHub Account erstellen (falls nicht vorhanden)
  - https://github.com/signup

- [ ] Repository "tastematch" erstellen
  - https://github.com/new
  - Name: `tastematch`
  - Public: ✓
  - Initialize with README: Optional
  - Create repository: Click!

- [ ] Git lokal konfigurieren
  ```bash
  git config --global user.name "Dein Name"
  git config --global user.email "deine@email.com"
  ```

- [ ] Repository initialisieren
  ```bash
  cd "C:\Users\topraksuyu\Desktop\BHT\TasteMatch 11.1"
  git init
  ```

- [ ] Remote hinzufügen
  ```bash
  git remote add origin https://github.com/[USERNAME]/tastematch.git
  ```

- [ ] Code zu GitHub pushen
  ```bash
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git push -u origin main
  ```

- [ ] Auf GitHub überprüfen
  - https://github.com/[USERNAME]/tastematch
  - ✓ Alle Dateien vorhanden?
  - ✓ README.md sichtbar?

- [ ] (Optional) GitHub Actions aktivieren
  - Settings → Actions → Allow all actions

- [ ] (Optional) Branch Protection
  - Settings → Branches → Protect main branch

---

## 🔑 Authentifizierung: Welche Option?

### **Token-Authentifizierung (Einfach) ⭐ EMPFOHLEN**

```bash
# 1. Personal Access Token generieren
https://github.com/settings/tokens/new
# Scopes: repo, workflow

# 2. Token kopieren (nur 1x sichtbar!)

# 3. Beim Push: Token als Passwort verwenden
git push -u origin main
# Username: [DEIN_GITHUB_USERNAME]
# Password: [DEIN_TOKEN]
```

### **SSH-Schlüssel (Profi)**

```bash
# 1. SSH-Key generieren
ssh-keygen -t ed25519 -C "deine@email.com"

# 2. Public Key kopieren & zu GitHub hinzufügen
# ~/.ssh/id_ed25519.pub → https://github.com/settings/ssh/new

# 3. Remote mit SSH URL
git remote set-url origin git@github.com:[USERNAME]/tastematch.git

# 4. Pushen ohne Passwort
git push -u origin main
```

---

## 📝 Vollständiger manueller Prozess

```bash
# ===== SCHRITT 1: Vorbereitung =====
cd "C:\Users\topraksuyu\Desktop\BHT\TasteMatch 11.1"

# Git überprüfen
git --version

# ===== SCHRITT 2: Git Konfigurieren =====
git config --global user.name "Dein Name"
git config --global user.email "deine@email.com"
git config --global --list  # Überprüfen

# ===== SCHRITT 3: Repository initialisieren =====
git init
git status  # Überprüfen: "On branch master" oder "On branch main"

# ===== SCHRITT 4: .gitignore erstellen =====
# (Optional - GITHUB_SETUP.bat macht das automatisch)
# Wichtige Ordner ausschließen:
# - node_modules/
# - .env
# - dist/

# ===== SCHRITT 5: Alle Dateien hinzufügen =====
git add .
git status  # Sollte grüne Changes zeigen

# ===== SCHRITT 6: Commit machen =====
git commit -m "Initial commit: TasteMatch v1.0.0"
git log --oneline  # Überprüfen: 1 commit sollte sichtbar sein

# ===== SCHRITT 7: Branch umbenennen =====
git branch -M main
git branch  # Sollte "* main" zeigen

# ===== SCHRITT 8: Remote hinzufügen =====
# WICHTIG: Deine GitHub URL kopieren
git remote add origin https://github.com/[DEIN_USERNAME]/tastematch.git
git remote -v  # Überprüfen: origin sollte sichtbar sein

# ===== SCHRITT 9: Zu GitHub pushen =====
git push -u origin main
# Authentifizierung eingeben (Token oder SSH)

# ===== SCHRITT 10: Überprüfen =====
# Browser: https://github.com/[DEIN_USERNAME]/tastematch
# ✓ Alle Dateien vorhanden?
# ✓ Code sichtbar?
# ✓ README.md angezeigt?
```

---

## 🐛 Häufige Fehler

### ❌ "fatal: remote origin already exists"
```bash
# Lösung:
git remote remove origin
git remote add origin https://github.com/[USERNAME]/tastematch.git
```

### ❌ "Authentication failed"
```bash
# Lösung 1: Token überprüfen
https://github.com/settings/tokens

# Lösung 2: Neue Credentials speichern
git credential reject https://github.com

# Lösung 3: SSH verwenden
git remote set-url origin git@github.com:[USERNAME]/tastematch.git
```

### ❌ "branch 'main' does not exist"
```bash
# Lösung:
git branch -M main
git push -u origin main
```

### ❌ "fatal: not a git repository"
```bash
# Lösung:
cd "C:\Users\topraksuyu\Desktop\BHT\TasteMatch 11.1"
git init
```

---

## 🎯 Nächste Schritte nach GitHub-Setup

### **Woche 1: Basis**
- ✅ Repository erstellen
- ✅ Code zu GitHub pushen
- ✅ README.md überprüfen
- ✅ .gitignore konfigurieren

### **Woche 2: Automation**
- [ ] GitHub Actions aktivieren
- [ ] Branch Protection einrichten
- [ ] Secrets für CI/CD konfigurieren

### **Woche 3+: Collaboration**
- [ ] Feature Branches erstellen
- [ ] Pull Requests verwenden
- [ ] Code Reviews einrichten
- [ ] Release Automation

---

## 📊 GitHub Workflow nach Setup

```
┌─ Git Init ─→ Git Add ─→ Git Commit ─→ Git Push ─┐
│                                                   │
│                                            GitHub │
│                                          Repo    │
│                                                   │
└─ Git Pull ←─ Git Fetch ←───────────────────────────┘

Täglicher Workflow:
1. Änderungen machen
2. git add .
3. git commit -m "..."
4. git push origin main
5. Auf GitHub überprüfen
```

---

## 🔗 Wichtige Links

| Link | Beschreibung |
|------|-------------|
| [GitHub](https://github.com) | Hauptseite |
| [New Repo](https://github.com/new) | Neues Repository |
| [Personal Tokens](https://github.com/settings/tokens) | Access Tokens |
| [SSH Keys](https://github.com/settings/ssh) | SSH Setup |
| [Dein Repo](https://github.com/[USERNAME]/tastematch) | Nach Setup sichtbar |

---

## ✨ Pro-Tipps

### **Commits mit Konvention schreiben**
```bash
# Good commits:
git commit -m "feat: Add restaurant filter"
git commit -m "fix: Fix login bug"
git commit -m "docs: Update README"
git commit -m "refactor: Clean up code"

# Bad commits:
git commit -m "update"
git commit -m "changes"
git commit -m "asdf"
```

### **Branch-Strategie für Team**
```bash
# Main branch: Immer produktiv!
main ────────→ Vercel Deploy

# Develop branch: Testing
develop ──→ Feature/Bug Branches
  ├─→ feature/login
  ├─→ feature/firebase
  └─→ bugfix/allergen-filter
```

### **Regelmäßig aktualisieren**
```bash
# Vor Start
git pull origin main

# Nach Arbeit
git push origin main

# Von anderen updates holen
git fetch origin
git pull origin main
```

---

## 🎉 Success Indicators

✅ **GitHub Integration erfolgreich, wenn:**
- Repository auf GitHub existiert
- Alle Dateien sind sichtbar
- Code kann geclont werden
- GitHub Actions können konfiguriert werden
- Zukünftige Pushes funktionieren ohne Fehler

---

**Status:** ✅ Bereit zum GitHub-Connect!  
**Letztes Update:** 11. Januar 2026  
**Nächster Schritt:** `GITHUB_SETUP.bat` ausführen oder manuell folgen
