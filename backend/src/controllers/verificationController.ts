import { Request, Response } from 'express';
import { db } from '../firebase';

export const verifyRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const { verificationCode, allergyInfo } = req.body;

    // Validate verification code (in production, use a more secure method)
    if (!verificationCode || verificationCode.length < 10) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Update restaurant with verification
    await db.collection('restaurants').doc(restaurantId).update({
      isVerified: true,
      verificationDate: new Date(),
      allergyInfo: allergyInfo || {},
    });

    res.json({ success: true, message: 'Restaurant verified successfully' });
  } catch (error) {
    console.error('Error verifying restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const requestVerification = async (req: Request, res: Response) => {
  try {
    const { restaurantId, email, phone, contactPerson } = req.body;

    // Store verification request
    await db.collection('verificationRequests').add({
      restaurantId,
      email,
      phone,
      contactPerson,
      status: 'pending',
      createdAt: new Date(),
    });

    // TODO: Send verification email with verification code

    res.json({
      success: true,
      message: 'Verification request submitted. Check your email for further instructions.',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRestaurantVerificationStatus = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const doc = await db.collection('restaurants').doc(restaurantId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const data = doc.data();

    res.json({
      restaurantId,
      isVerified: data?.isVerified || false,
      verificationDate: data?.verificationDate,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
