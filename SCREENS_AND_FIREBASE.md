# 🎨 TasteMatch - Design & Firebase Implementation

## 📱 Alle Screens (6 Mockups)

### **Screen 1: 🔐 Login/Authentifizierung**
```
┌─────────────────────────────────┐
│  ← │ Login           │ ˣ       │
├─────────────────────────────────┤
│                                 │
│   🍽️ TasteMatch                │
│                                 │
│  ┌─────────────────────────────┐│
│  │ Email                      ││
│  ├─────────────────────────────┤│
│  │ Passwort                   ││
│  ├─────────────────────────────┤│
│  │   ANMELDEN                 ││
│  ├─────────────────────────────┤│
│  │ Mit Google anmelden        ││
│  └─────────────────────────────┘│
│                                 │
│  Noch kein Account?             │
│  Jetzt registrieren             │
│                                 │
└─────────────────────────────────┘

Firebase: Authentication
- Email/Passwort
- Google Sign-In
- Session Management
```

---

### **Screen 2: 🔍 Allergie-Filter**
```
┌─────────────────────────────────┐
│  ← │ Filter         │ ✓       │
├─────────────────────────────────┤
│ Allergien wählen                │
├─────────────────────────────────┤
│  ☑️ 🌾 Gluten   ☐ 🥜 Nüsse    │
│  ☑️ 🥛 Milch    ☐ 🥚 Eier     │
│  ☐ 🐟 Fisch     ☐ 🦐 Meeresf.│
│  ☐ 🌾 Sesam     ☐ 🐚 Muscheln│
│  ☐ 🥬 Soja      ☐ 🌰 Haseln. │
│  ☐ 🍌 Banane    ☐ 🧄 Knoblauch│
├─────────────────────────────────┤
│ 📍 Entfernung: 15 km            │
│ ▁▁▁●▁▁▁▁▁▁▁▁▁▁▁▁▁▁ 50 km       │
├─────────────────────────────────┤
│      Filter anwenden            │
└─────────────────────────────────┘

Firebase: Firestore
- User-Preferences speichern
- Query nach Allergien
- Distance-Filter
```

---

### **Screen 3: 💬 Swipe-Karten (Hauptfunktion)**
```
┌─────────────────────────────────┐
│  ← │ Restaurants    │ ❤️      │
├─────────────────────────────────┤
│                                 │
│   ┌──────────────────────────┐  │
│   │      🍕                 │  │
│   │                          │  │
│   │ La Bella Pizza           │  │
│   │ Italienisch • 2,3 km     │  │
│   │ ⭐⭐⭐⭐⭐ 4.8 (120)      │  │
│   │                          │  │
│   ├──────────────────────────┤  │
│   │   👎    │    ❤️          │  │
│   └──────────────────────────┘  │
│                                 │
│ "Swipe links (👎) oder        │
│  rechts (❤️) zum nächsten!"    │
│                                 │
└─────────────────────────────────┘

Firebase: Firestore + Realtime DB
- Restaurants abrufen
- User preferences anwenden
- Likes speichern
- Realtime Sync
```

---

### **Screen 4: ❤️ Favoriten-Verwaltung**
```
┌─────────────────────────────────┐
│  ← │ Favoriten      │ ↓       │
├─────────────────────────────────┤
│ ❤️ Deine Favoriten (3)          │
├─────────────────────────────────┤
│ 🍕 La Bella Pizza           ✕   │
├─────────────────────────────────┤
│ 🍔 Burger House             ✕   │
├─────────────────────────────────┤
│ 🍜 Tokyo Ramen              ✕   │
├─────────────────────────────────┤
│                                 │
│      Alle anzeigen →            │
│                                 │
│ (Liste ist scrollbar)           │
│                                 │
└─────────────────────────────────┘

Firebase: Cloud Firestore
- user_favorites Collection
- Echtzeit-Sync
- Cloud Storage für Bilder
- Timestamps für Sortierung
```

---

### **Screen 5: ⭐ Bewertungen & Reviews**
```
┌─────────────────────────────────┐
│  ← │ Bewertungen    │ 📸      │
├─────────────────────────────────┤
│ ⭐ La Bella Pizza               │
├─────────────────────────────────┤
│ 👤 Maria S.                     │
│ ⭐⭐⭐⭐⭐                       │
│ "Glutenfrei Pasta perfekt!      │
│  Sehr freundlich."              │
├─────────────────────────────────┤
│ 👤 Peter K.                     │
│ ⭐⭐⭐⭐                        │
│ "Gute Pizza, Allergie-Info      │
│  war hilfreich. ✓"              │
├─────────────────────────────────┤
│ 👤 Sarah M.                     │
│ ⭐⭐⭐⭐⭐                       │
│ "Nussallergiker - sehr sicher!" │
├─────────────────────────────────┤
│     Bewertung schreiben         │
└─────────────────────────────────┘

Firebase: Firestore + Cloud Storage
- reviews Collection
- review_photos Collection
- Photo URLs in Storage
- Moderation via Cloud Functions
```

---

### **Screen 6: 👨‍💼 Admin-Dashboard**
```
┌─────────────────────────────────┐
│  ← │ Admin          │ ⚙️      │
├─────────────────────────────────┤
│ [Restaurants] [Verify] [Users]  │
├─────────────────────────────────┤
│ Name          │ Status   │ Edit  │
├─────────────────────────────────┤
│ La Bella      │ ✓ Verify │  ✎   │
│ Burger House  │ ✓ Verify │  ✎   │
│ Tokyo Ramen   │ ⏳ Pending│  ✎   │
│ Sushi Master  │ ✓ Verify │  ✎   │
│ Curry Place   │ ⏳ Pending│  ✎   │
├─────────────────────────────────┤
│ (Scrollbar für mehr)            │
│                                 │
└─────────────────────────────────┘

Firebase: Admin SDK + Firestore
- restaurants Collection Management
- verifications Collection
- Review Moderation
- User Management
- Analytics Dashboard
```

---

## 🔥 Firebase-Integration Übersicht

### **Datenfluss-Diagramm:**

```
    ┌──────────────────────────────────────────────────┐
    │              TasteMatch Frontend                 │
    │  HTML5 / CSS3 / JavaScript                       │
    └──────────────────┬───────────────────────────────┘
                       │
                ┌──────▼──────┐
                │  Firebase   │
                │  JavaScript │
                │     SDK     │
                └──────┬──────┘
                       │
        ┌──────────────┼──────────────┬───────────────┐
        │              │              │               │
    ┌───▼───┐   ┌──────▼─────┐  ┌───▼────┐   ┌────▼────┐
    │ Auth  │   │ Firestore  │  │Storage │   │Functions│
    │       │   │            │  │        │   │         │
    │ Login │   │Restaurants │  │ Photos │   │Modera-  │
    │Google │   │ Reviews    │  │ Avatars│   │tion     │
    │ Apple │   │Favorites   │  │ Images │   │Verify   │
    └───┬───┘   │Preferences │  └───┬────┘   └────┬────┘
        │       └──────┬─────┘      │             │
        │              │            │             │
        └──────────────┼────────────┴─────────────┘
                       │
                Real-time Sync ↔️
                Notifications
                
                Security Rules
                ├─ User-Auth Check
                ├─ Admin-Rights
                ├─ Data-Permission
                └─ Rate Limiting
```

---

## 📊 Collections & Datenstruktur

### **users Collection**
```javascript
{
  uid: "user_123",
  email: "maria@example.com",
  displayName: "Maria",
  photoURL: "gs://bucket/users/maria.jpg",
  createdAt: Timestamp(2026-01-11),
  preferences: {
    allergies: ["gluten", "nuts"],
    distance: 15,
    verifiedOnly: true
  }
}
```

### **restaurants Collection**
```javascript
{
  id: "rest_001",
  name: "La Bella Pizza",
  cuisine: "Italienisch",
  address: "Hauptstr. 10, Berlin",
  phone: "+49 30 12345",
  rating: 4.8,
  reviewCount: 120,
  verified: true,
  allergens: {
    gluten: true,
    nuts: true,
    dairy: false,
    fish: false
  },
  distance: 2.3,
  imageURL: "gs://bucket/restaurants/bella.jpg",
  hours: {
    monday: "11:00-22:00",
    tuesday: "11:00-22:00"
  }
}
```

### **reviews Collection**
```javascript
{
  id: "review_456",
  restaurantId: "rest_001",
  userId: "user_123",
  rating: 5,
  title: "Perfekt für Glutenunverträglichkeit!",
  text: "Die glutenfreie Pasta war hervorragend...",
  allergyInfo: "Glutenfrei zubereitet, separate Utensilien",
  photos: [
    "gs://bucket/reviews/photo1.jpg",
    "gs://bucket/reviews/photo2.jpg"
  ],
  approved: true,
  createdAt: Timestamp(2026-01-11),
  updatedAt: Timestamp(2026-01-11),
  helpful: 42,
  unhelpful: 2
}
```

### **user_favorites Collection**
```javascript
{
  userId: "user_123",
  favorites: [
    "rest_001", // La Bella
    "rest_003", // Burger House
    "rest_005"  // Tokyo Ramen
  ],
  lastUpdated: Timestamp(2026-01-11),
  count: 3
}
```

### **verifications Collection**
```javascript
{
  id: "verify_789",
  restaurantId: "rest_001",
  email: "owner@bella.de",
  code: "AB12CD",
  verified: true,
  verifiedAt: Timestamp(2026-01-11),
  expiresAt: Timestamp(2026-01-12),
  attempts: 1
}
```

---

## 🔐 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ===== AUTHENTIFIZIERUNG =====
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return request.auth.token.admin == true;
    }
    
    // ===== USERS COLLECTION =====
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId);
      allow create: if isSignedIn();
    }
    
    // ===== RESTAURANTS COLLECTION =====
    match /restaurants/{restaurantId} {
      allow read: if true;  // Öffentlich lesbar
      allow write: if isAdmin();
      allow create: if isAdmin();
    }
    
    // ===== REVIEWS COLLECTION =====
    match /reviews/{reviewId} {
      allow read: if true;  // Öffentlich lesbar
      allow create: if isSignedIn();
      allow update, delete: if 
        isOwner(resource.data.userId) || isAdmin();
      allow write: if isAdmin();  // Moderation
    }
    
    // ===== USER FAVORITES =====
    match /user_favorites/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    // ===== VERIFICATIONS =====
    match /verifications/{verificationId} {
      allow read, write: if isAdmin();
    }
  }
}
```

---

## ⚡ Cloud Functions Beispiele

### **Funktion 1: Neuer User (Auto-Create)**
```javascript
exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  
  await db.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName || 'User',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    preferences: {
      allergies: [],
      distance: 15,
      verifiedOnly: false
    }
  });
});
```

### **Funktion 2: Review-Moderation**
```javascript
exports.moderateReview = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate(async (snap, context) => {
    const review = snap.data();
    
    // Spam-Filter
    if (review.text.length < 10) {
      await snap.ref.delete();
      return { error: 'Text zu kurz' };
    }
    
    // Approval-Status
    await snap.ref.update({
      approved: true,
      moderated_at: admin.firestore.FieldValue.serverTimestamp()
    });
  });
```

### **Funktion 3: Verifizierungs-Code senden**
```javascript
exports.sendVerificationCode = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User muss angemeldet sein');
  }
  
  const { restaurantId, email } = data;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  // In Firestore speichern
  await admin.firestore().collection('verifications').add({
    restaurantId,
    email,
    code,
    verified: false,
    expiresAt: new Date(Date.now() + 24*60*60*1000)
  });
  
  // E-Mail senden
  await sendEmail(email, `Dein Verifizierungs-Code: ${code}`);
  
  return { success: true };
});
```

---

## 📊 Implementation Checklist

### **Phase 1: Firebase Setup**
- [ ] Firebase Projekt erstellen
- [ ] Firebase Credentials erhalten
- [ ] Authentication aktivieren
- [ ] Firestore initialisieren
- [ ] Collections erstellen
- [ ] Security Rules setzen

### **Phase 2: Frontend Integration**
- [ ] Login-Screen implementieren
- [ ] Filter-Screen implementieren
- [ ] Swipe-Screen implementieren
- [ ] Favoriten-Screen implementieren
- [ ] Reviews-Screen implementieren
- [ ] Admin-Screen implementieren

### **Phase 3: Cloud Features**
- [ ] Cloud Storage für Fotos
- [ ] Cloud Functions deployen
- [ ] Analytics aktivieren
- [ ] Cloud Messaging (optional)
- [ ] Email-Versand

### **Phase 4: Testing & Launch**
- [ ] Security Rules testen
- [ ] Load Testing
- [ ] User Acceptance Testing
- [ ] Backup-Strategie
- [ ] Monitoring einrichten
- [ ] Launch!

---

## 🎊 Zusammenfassung

**TasteMatch ist eine moderne Firebase-basierte App mit:**

✅ **6 Screens** für komplette User Journey  
✅ **Echtzeit-Synchronisation** zwischen Geräten  
✅ **Sichere Authentifizierung** mit Google/Apple  
✅ **Cloud-basierte Datenspeicherung** ohne Datenbank-Server  
✅ **Serverlose Funktionen** für komplexe Logik  
✅ **Benutzer-freundliches Admin-Dashboard**  
✅ **Photo Upload & Cloud Storage**  
✅ **Realtime Analytics** für Insights  
✅ **Skalierbar auf Millionen Users**  
✅ **Pay-as-you-go Pricing** (kostenlos zum Starten)  

---

**Status:** ✅ **Bereit zur Implementierung**  
**Nächster Schritt:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) lesen!
