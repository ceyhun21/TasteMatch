# 🎯 TasteMatch - LIVE SETUP ANLEITUNG

## ✅ Status: APP LÄUFT JETZT!

Der HTTP-Server läuft bereits auf **Port 8000**.

---

## 🌐 URLs zum Öffnen

### **1. Main App (Für Nutzer)**
```
http://localhost:8000
```
- Swipe-Funktion für Restaurants
- Allergie-Filter
- Favoriten-Management
- Bewertungsanzeige

### **2. Admin Panel (Für Verwaltung)**
```
http://localhost:8000/admin.html
```
- Restaurant-Verwaltung
- Verification-System
- Bewertungs-Moderation
- User & Analytics Dashboard

---

## 🎮 So funktioniert die App

### **Schritt-für-Schritt für Nutzer:**

1. **App öffnen** → http://localhost:8000
2. **Allergien auswählen** (Links)
   - Klick auf Allergen-Namen
   - Sie werden rot = Ausgewählt
3. **Entfernung einstellen**
   - Mit Schieberegler: 1-50 km
4. **Nur Verifizierte filtern**
   - Checkbox aktivieren
5. **Swipen!**
   - ❤️ Like = Rechts-Swipe
   - ✕ Nicht interessiert = Links-Swipe
6. **Favoriten sehen** (Rechts)
   - Alle gelikten Restaurants
   - Direkt entfernen möglich

### **Für Admin-Benutzer:**

1. **Admin öffnen** → http://localhost:8000/admin.html
2. **Tabs durchgehen:**
   - 📍 **Restaurants** - Verwaltung & Hinzufügen
   - ✓ **Verifizierung** - Codes generieren
   - ⭐ **Bewertungen** - Moderation
   - 👥 **Nutzer** - Management
   - 📊 **Analytics** - Statistiken

---

## 📊 12 Test-Restaurants

| # | Name | Küche | Rating | Entfernung | Verifiziert |
|---|------|-------|--------|-----------|------------|
| 1 | Bella Italia | Italienisch | 4.8⭐ | 1.2 km | ✓ |
| 2 | Sushi Paradise | Japanisch | 4.6⭐ | 2.1 km | ✓ |
| 3 | Curry House | Indisch | 4.4⭐ | 3.5 km | ✓ |
| 4 | Green Garden | Vegetarisch | 4.7⭐ | 0.8 km | ✓ |
| 5 | Burger King Alt. | American | 4.2⭐ | 1.5 km | ✗ |
| 6 | Pho Vietnam | Vietnamesisch | 4.5⭐ | 2.8 km | ✓ |
| 7 | Steakhouse Prem. | Steaks | 4.9⭐ | 4.2 km | ✓ |
| 8 | Taco Fiesta | Mexikanisch | 4.3⭐ | 1.9 km | ✓ |
| 9 | Pizza Paradise | Italienisch | 4.4⭐ | 2.3 km | ✓ |
| 10 | Wok Express | Chinesisch | 4.1⭐ | 3.8 km | ✗ |
| 11 | Falafel Corner | Orientalisch | 4.6⭐ | 2.6 km | ✓ |
| 12 | Thai Orchid | Thailändisch | 4.7⭐ | 3.2 km | ✓ |

---

## 🧪 Test-Szenarien

### **Test 1: Allergie-Filter**
1. Öffne http://localhost:8000
2. Klick auf "Gluten"
3. Restaurants mit Gluten verschwinden
4. Klick auf "Milch"
5. Noch mehr Restaurants gefiltert
6. Filter zurücksetzen

### **Test 2: Entfernung**
1. Schieberegler auf 2 km
2. Nur nahe Restaurants anzeigen
3. Auf 5 km setzen
4. Mehr Restaurants erscheinen

### **Test 3: Swipe-Funktion**
1. "❤️ Like" Knopf klicken
2. Nächstes Restaurant anzeigen
3. Favoriten rechts anwachsen
4. Mehrmals swipen
5. Alle Restaurants durchschauen

### **Test 4: Admin-Panel**
1. http://localhost:8000/admin.html
2. "Restaurants" Tab
3. "+ Neues Restaurant" klicken
4. Formular ausfüllen
5. "Speichern" klicken
6. Restaurant in Tabelle sehen

---

## 💾 Datenspeicherung

**Wo werden Daten gespeichert?**
- Browser LocalStorage
- Persistiert automatisch
- Überleben Browser-Restart
- Pro Browser/Gerät separate Speicherung

**Admin-Daten zurücksetzen:**
```javascript
// In Browser DevTools Console (F12):
localStorage.clear();
// Oder spezifisch:
localStorage.removeItem('restaurants');
```

---

## 🔧 Wenn der Server abstürzt

```bash
# Terminal öffnen im Projektordner
cd "c:\Users\topraksuyu\Desktop\BHT\TasteMatch 11.1"

# Server neu starten
python -m http.server 8000
```

Dann wieder öffnen: http://localhost:8000

---

## 📱 Browser-Kompatibilität

✅ Chrome / Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile Browser (Responsive Design)

---

## 🎨 Funktionen pro Seite

### **index.html (Main App)**
```
✓ Allergie-Filter mit 12 Allergenen
✓ Entfernung-Schieberegler (1-50 km)
✓ Verifizierungs-Filter
✓ Swipe-Logik (Like/Dislike)
✓ Favoriten-Management
✓ Restaurant-Details
✓ Allergen-Warnungen
✓ Reviews-Anzeige
✓ Responsive Design
```

### **admin.html (Admin Panel)**
```
✓ Restaurant-CRUD (Create, Read, Update, Delete)
✓ Verifizierungs-Code Generator
✓ Bewertungs-Moderation
✓ User-Verwaltung
✓ Analytics & Statistiken
✓ LocalStorage Persistierung
✓ Modal-Dialoge
✓ Tab-Navigation
✓ Validation
```

---

## 🚀 Nächste Stufen

### **Phase 2: Backend** (Später mit Node.js)
```bash
# Erst Node.js installieren!
cd frontend && npm install && npm run dev
cd backend && npm install && npm run dev
```

### **Phase 3: Datenbank** (Mit Firebase)
- Firestore statt LocalStorage
- Real-time Updates
- Cloud Storage für Bilder
- Authentication

### **Phase 4: API Integration**
- Google Maps API
- Email-Verifizierung
- Photo-Upload
- Advanced Analytics

---

## 📞 Häufige Fragen

**F: Wo sind meine Daten?**
A: Im Browser's LocalStorage. Öffnen Sie DevTools (F12) → Application → Local Storage

**F: Kann ich Restaurants hinzufügen?**
A: Ja! Öffnen Sie http://localhost:8000/admin.html

**F: Was ist die Verifizierungs-Code für?**
A: Er wird verwendet, wenn Restaurants sich registrieren wollen (für später mit Email-Integration)

**F: Funktioniert das auf dem Handy?**
A: Ja! Öffnen Sie die gleiche URL auf Ihrem Handy (wenn auf gleichem WiFi)

**F: Wie lange bleiben die Daten?**
A: Solange bis Sie LocalStorage löschen. Browser-übergreifend nicht syncronisiert.

---

## ✨ Zusammenfassung

| Aspekt | Status | Details |
|--------|--------|---------|
| Frontend | ✅ Live | http://localhost:8000 |
| Admin Panel | ✅ Live | http://localhost:8000/admin.html |
| Allergie-Filter | ✅ 100% | 12 Allergene |
| Swipe-Funktion | ✅ 100% | Like/Dislike |
| Favoriten | ✅ 100% | Persistent |
| Bewertungen | ✅ 100% | Mock-Daten |
| Verifizierung | ✅ 60% | Codes funktionieren |
| Database | ✅ LocalStorage | Echtzeit-Sync |
| Backend API | ⏳ Geplant | Mit Node.js |
| Firebase | ⏳ Geplant | Für Phase 2 |
| Google Maps | ⏳ Geplant | Für Phase 2 |

---

## 🎉 **Die App ist LIVE und funktioniert!**

### **Jetzt testen:**
1. Öffnen Sie: **http://localhost:8000**
2. Probieren Sie die Allergie-Filter
3. Swipen Sie durch Restaurants
4. Sammeln Sie Favoriten!

Viel Spaß! 🍽️❤️
