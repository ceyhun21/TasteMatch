import { Request, Response } from 'express';
import { db, auth } from '../firebase';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId, email, name, allergies = [] } = req.body;

    await db.collection('users').doc(userId).set({
      email,
      name,
      allergies,
      createdAt: new Date(),
      isVerified: false,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const doc = await db.collection('users').doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAllergies = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { allergies } = req.body;

    await db.collection('users').doc(userId).update({
      allergies,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserLikes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection('users')
      .doc(userId)
      .collection('likes')
      .where('liked', '==', true)
      .get();

    const likes: any[] = [];
    snapshot.forEach((doc) => {
      likes.push(doc.id);
    });

    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
