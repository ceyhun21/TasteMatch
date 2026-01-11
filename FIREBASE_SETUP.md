# 🔥 TasteMatch - Firebase Integration Guide

## 📋 Überblick

TasteMatch nutzt **Firebase** als vollständige Backend-Lösung mit:
- 🔐 Authentication (Benutzer-Management)
- 💾 Firestore (Realtime-Datenbank)
- 📸 Cloud Storage (Bilder & Videos)
- ⚡ Cloud Functions (Serverlose Logik)
- 📊 Analytics (User-Verhalten)

---

## 🚀 Schritt 1: Firebase Projekt erstellen

### 1.1 Projekt anlegen
```
1. Gehen Sie zu: https://firebase.google.com
2. Klicken Sie "Konsole" → "Neues Projekt erstellen"
3. Name: "tastematch-app"
4. Optional: Google Analytics aktivieren
5. "Projekt erstellen"
```

### 1.2 App registrieren
```
1. Im Firebase Console
2. "+ App hinzufügen" → "Web"
3. App-Name: "TasteMatch Web"
4. Firebase Hosting aktivieren (optional)
5. "App registrieren"
```

### 1.3 Firebase Credentials kopieren
```javascript
// Dies ist der Code den Firebase gibt:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "tastematch-app.firebaseapp.com",
  projectId: "tastematch-app",
  storageBucket: "tastematch-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🔐 Schritt 2: Firebase Authentication Setup

### 2.1 Authentication aktivieren
```
1. Firebase Console öffnen
2. "Authentication" → "Erste Schritte"
3. "Email/Passwort" aktivieren
4. "Google" aktivieren
5. "Apple" aktivieren (optional)
```

### 2.2 Frontend Code (Anmelden)
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Login erfolgreich:', user.uid);
    return user;
  } catch (error) {
    console.error('Login fehlgeschlagen:', error.message);
  }
}

// Registrieren
async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Registrierung erfolgreich:', user.uid);
    return user;
  } catch (error) {
    console.error('Registrierung fehlgeschlagen:', error.message);
  }
}

// Session prüfen
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User angemeldet:', user.email);
  } else {
    console.log('User nicht angemeldet');
  }
});
```

---

## 💾 Schritt 3: Firestore Datenbank Setup

### 3.1 Firestore aktivieren
```
1. Firebase Console
2. "Firestore Database" → "Datenbank erstellen"
3. Region: Europe (z.B. "eur3")
4. Sicherheitsmodus: "Im Test-Modus starten"
5. "Erstellen"
```

### 3.2 Collections erstellen
```
Firestore hierarchie:
├─ users/
│  ├─ {userId}
│  │  ├─ email
│  │  ├─ name
│  │  ├─ createdAt
│
├─ restaurants/
│  ├─ {restaurantId}
│  │  ├─ name
│  │  ├─ cuisine
│  │  ├─ rating
│  │  ├─ verified
│
├─ reviews/
│  ├─ {reviewId}
│  │  ├─ restaurantId
│  │  ├─ userId
│  │  ├─ rating
│  │  ├─ text
│
├─ user_favorites/
│  ├─ {userId}
│  │  ├─ favorites (array)
│
└─ verifications/
   ├─ {verificationId}
      ├─ restaurantId
      ├─ code
      ├─ verified
```

### 3.3 Frontend Code (Restaurants abrufen)
```javascript
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const db = getFirestore(app);

// Alle Restaurants abrufen
async function getRestaurants() {
  const restaurantsCol = collection(db, 'restaurants');
  const snapshot = await getDocs(restaurantsCol);
  const restaurants = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return restaurants;
}

// Mit Filter
async function getFilteredRestaurants(allergies) {
  const restaurantsCol = collection(db, 'restaurants');
  const q = query(
    restaurantsCol,
    where('verified', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Favorit hinzufügen
async function addFavorite(userId, restaurantId) {
  const favoriteRef = doc(db, 'user_favorites', userId);
  await updateDoc(favoriteRef, {
    favorites: arrayUnion(restaurantId)
  });
}

// Favoriten abrufen
async function getFavorites(userId) {
  const userFavs = await getDoc(doc(db, 'user_favorites', userId));
  return userFavs.data()?.favorites || [];
}
```

---

## 📸 Schritt 4: Cloud Storage Setup

### 4.1 Storage aktivieren
```
1. Firebase Console
2. "Cloud Storage" → "Erste Schritte"
3. Region: "europe-west1"
4. "Fertig"
```

### 4.2 Ordnerstruktur
```
tastematch-app.appspot.com/
├─ restaurants/
│  ├─ {restaurantId}/
│  │  ├─ profile.jpg
│  │  ├─ menu.pdf
│
├─ reviews/
│  ├─ {reviewId}/
│  │  ├─ photo_1.jpg
│  │  ├─ photo_2.jpg
│
└─ users/
   ├─ {userId}/
      └─ avatar.jpg
```

### 4.3 Frontend Code (Bilder hochladen)
```javascript
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

// Bild hochladen
async function uploadReviewPhoto(reviewId, file) {
  const storageRef = ref(storage, `reviews/${reviewId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

// Review mit Fotos speichern
async function createReviewWithPhotos(restaurantId, userId, review, photos) {
  // Fotos hochladen
  const photoUrls = [];
  for (const photo of photos) {
    const url = await uploadReviewPhoto(restaurantId, photo);
    photoUrls.push(url);
  }

  // Review in Firestore speichern
  const reviewsCol = collection(db, 'reviews');
  const docRef = await addDoc(reviewsCol, {
    restaurantId,
    userId,
    rating: review.rating,
    text: review.text,
    photos: photoUrls,
    createdAt: new Date()
  });

  return docRef.id;
}
```

---

## 🔔 Schritt 5: Cloud Functions Setup

### 5.1 Funktionen aktivieren
```bash
# Firebase CLI installieren
npm install -g firebase-tools

# Anmelden
firebase login

# Projekt initialisieren
firebase init functions

# Auswählen: JavaScript, ESLint
```

### 5.2 Beispiel-Funktionen

#### Funktion 1: Neuer User
```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

// Bei neuem User -> User-Dokument erstellen
exports.createUserDoc = functions.auth.user().onCreate(async (user) => {
  return db.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    preferences: {
      allergies: [],
      distance: 15,
      verifiedOnly: false
    }
  });
});
```

#### Funktion 2: Verifizierungs-Code
```javascript
// Verifizierungs-Code generieren
exports.generateVerificationCode = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User muss angemeldet sein');
  }

  const { restaurantId, email } = data;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 Stunden

  await db.collection('verifications').add({
    restaurantId,
    email,
    code,
    verified: false,
    expiresAt,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // E-Mail senden (mit SendGrid oder ähnlich)
  console.log(`Verifizierungs-Code für ${email}: ${code}`);

  return { success: true, message: 'Code gesendet' };
});
```

#### Funktion 3: Review-Moderation
```javascript
// Neue Reviews überprüfen (Spam-Filter)
exports.moderateReview = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate(async (snap, context) => {
    const review = snap.data();

    // Spam-Prüfung
    if (review.text.length < 10) {
      await snap.ref.delete();
      return;
    }

    // Approval-Status setzen
    await snap.ref.update({
      approved: true,
      moderated_at: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Review genehmigt:', context.params.reviewId);
  });
```

---

## 🔐 Schritt 6: Firestore Security Rules

### 6.1 Sicherheitsregeln setzen
```
Firebase Console → Firestore → Regeln
```

### 6.2 Empfohlene Regeln
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ===== USERS =====
    // Nur der Besitzer kann sein Dokument lesen/schreiben
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // ===== RESTAURANTS =====
    // Öffentlich lesbar
    match /restaurants/{restaurantId} {
      allow read: if true;
      // Nur Admins können schreiben
      allow create, update, delete: if 
        request.auth.token.admin == true;
    }
    
    // ===== REVIEWS =====
    // Öffentlich lesbar
    match /reviews/{reviewId} {
      allow read: if true;
      // Authentifizierte User können erstellen
      allow create: if request.auth != null;
      // Nur der Autor kann updaten/löschen
      allow update, delete: if 
        request.auth.uid == resource.data.userId;
    }
    
    // ===== USER FAVORITES =====
    // Nur der Besitzer kann sehen
    match /user_favorites/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // ===== VERIFICATIONS =====
    // Nur Admins
    match /verifications/{verificationId} {
      allow read, write: if request.auth.token.admin == true;
    }
  }
}
```

---

## 📊 Schritt 7: Firebase Analytics Setup

### 7.1 Analytics aktivieren
```javascript
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(app);

// Events tracken
logEvent(analytics, 'restaurant_viewed', {
  restaurant_id: restaurantId,
  restaurant_name: name,
  cuisine: cuisine
});

logEvent(analytics, 'favorite_added', {
  restaurant_id: restaurantId
});

logEvent(analytics, 'review_submitted', {
  restaurant_id: restaurantId,
  rating: rating
});

logEvent(analytics, 'filter_applied', {
  allergies: allergies.length,
  distance: distance
});
```

### 7.2 Im Firebase Console sehen
```
Firebase Console → Analytics → Ereignisse
```

---

## 🔧 Schritt 8: Firebase Admin SDK (Backend)

### 8.1 Installation
```bash
npm install firebase-admin
```

### 8.2 Verwendung (Node.js Backend)
```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

// User erstellen (Admin)
async function createUser(email, password) {
  const user = await auth.createUser({
    email,
    password
  });
  return user;
}

// Batch-Operationen
async function importRestaurants(restaurantsList) {
  const batch = db.batch();
  
  restaurantsList.forEach((restaurant) => {
    const ref = db.collection('restaurants').doc();
    batch.set(ref, restaurant);
  });

  await batch.commit();
}

// Abfragen
async function getRestaurantsByAllergen(allergen) {
  const snapshot = await db.collection('restaurants')
    .where('allergens', 'array-contains', allergen)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

---

## 📱 Schritt 9: Frontend Integration

### 9.1 Komplettes Beispiel (React)
```javascript
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = { /* Ihre Config */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function TasteMatch() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth State überwachen
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Restaurants laden
    const loadRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRestaurants(data);
      setLoading(false);
    };

    if (user) {
      loadRestaurants();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div>Lädt...</div>;
  if (!user) return <div>Bitte melden Sie sich an</div>;

  return (
    <div>
      <h1>Willkommen, {user.email}</h1>
      <button onClick={handleLogout}>Abmelden</button>
      
      <div className="restaurants">
        {restaurants.map(restaurant => (
          <div key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.cuisine}</p>
            <p>Rating: {restaurant.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasteMatch;
```

---

## ☁️ Schritt 10: Deployment auf Firebase Hosting

### 10.1 Hosting aktivieren
```bash
firebase init hosting
# Auswählen: dist (oder public)
```

### 10.2 Deployen
```bash
npm run build  # Falls Sie einen Build-Prozess haben
firebase deploy
```

### 10.3 Production URL
```
https://tastematch-app.web.app
```

---

## 📋 Checkliste

- [ ] Firebase Projekt erstellt
- [ ] Firebase Credentials kopiert
- [ ] Authentication aktiviert (Email, Google)
- [ ] Firestore Collections erstellt
- [ ] Cloud Storage konfiguriert
- [ ] Cloud Functions deployiert
- [ ] Security Rules gesetzt
- [ ] Analytics aktiviert
- [ ] Firebase Hosting eingerichtet
- [ ] Frontend Code integriert
- [ ] Auf Firebase Hosting deployed
- [ ] Tests durchgeführt
- [ ] Backup-Strategie definiert

---

## 🔗 Nützliche Ressourcen

- [Firebase Dokumentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- [Firebase SDKs](https://firebase.google.com/docs/libraries)
- [Firestore Queries](https://firebase.google.com/docs/firestore/query-data/queries)
- [Cloud Functions](https://firebase.google.com/docs/functions)
- [Security Rules](https://firebase.google.com/docs/rules)

---

**Glückwunsch! Ihre TasteMatch App ist jetzt mit Firebase verbunden!** 🎉
