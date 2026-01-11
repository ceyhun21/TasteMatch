import { Request, Response } from 'express';
import { db } from '../firebase';
import admin from '../firebase';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { restaurantId, userId, rating, text, images, allergyRelevant } = req.body;

    const reviewRef = await db.collection('reviews').add({
      restaurantId,
      userId,
      userName: req.body.userName,
      userAvatar: req.body.userAvatar,
      rating,
      text,
      images,
      allergyRelevant,
      createdAt: new Date(),
      helpful: 0,
    });

    // Update restaurant rating
    const restaurantRef = db.collection('restaurants').doc(restaurantId);
    const restaurantDoc = await restaurantRef.get();
    const restaurantData = restaurantDoc.data();

    if (restaurantData) {
      const newReviewCount = (restaurantData.reviewCount || 0) + 1;
      const newRating =
        ((restaurantData.rating || 0) * restaurantData.reviewCount + rating) /
        newReviewCount;

      await restaurantRef.update({
        rating: newRating,
        reviewCount: newReviewCount,
      });
    }

    res.json({
      id: reviewRef.id,
      restaurantId,
      userId,
      rating,
      text,
      images,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getReviewsByRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const snapshot = await db
      .collection('reviews')
      .where('restaurantId', '==', restaurantId)
      .orderBy('createdAt', 'desc')
      .get();

    const reviews: any[] = [];
    snapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.collection('reviews').doc(id).delete();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const markHelpful = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.collection('reviews').doc(id).update({
      helpful: admin.firestore.FieldValue.increment(1),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
