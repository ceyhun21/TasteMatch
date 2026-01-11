import { Request, Response } from 'express';
import { db } from '../firebase';
import axios from 'axios';

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface FilterOptions {
  maxDistance: number;
  allergies: string[];
  onlyVerified: boolean;
  minRating?: number;
}

// Get nearby restaurants
export const getNearby = async (req: Request, res: Response) => {
  try {
    const { lat, lng, maxDistance = 5, allergies = '', onlyVerified = true } = req.query;
    
    const allergyList = allergies ? (allergies as string).split(',') : [];
    
    // Get all restaurants from Firestore
    let query = db.collection('restaurants');
    
    if (onlyVerified) {
      query = query.where('isVerified', '==', true);
    }

    const snapshot = await query.get();
    let restaurants: any[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const distance = calculateDistance(
        parseFloat(lat as string),
        parseFloat(lng as string),
        data.location.lat,
        data.location.lng
      );

      if (distance <= (maxDistance as number)) {
        // Check allergens
        let hasAllergen = false;
        for (const allergy of allergyList) {
          if (data.allergyInfo[allergy]) {
            hasAllergen = true;
            break;
          }
        }

        if (!hasAllergen) {
          restaurants.push({
            id: doc.id,
            ...data,
            distance: parseFloat(distance.toFixed(2)),
          });
        }
      }
    });

    // Sort by rating and distance
    restaurants.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.distance - b.distance;
    });

    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get restaurant by ID
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('restaurants').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Like restaurant
export const likeRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Update restaurant likes
    await db.collection('restaurants').doc(id).update({
      likes: admin.firestore.FieldValue.increment(1),
    });

    // Save user's like
    await db.collection('users').doc(userId).collection('likes').doc(id).set({
      restaurantId: id,
      liked: true,
      timestamp: new Date(),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Unlike restaurant
export const unlikeRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    await db.collection('users').doc(userId).collection('likes').doc(id).delete();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to calculate distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

import admin from '../firebase';
