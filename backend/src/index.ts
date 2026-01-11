import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'TasteMatch API is running' });
});

// Restaurant Routes
app.get('/api/restaurants/nearby', async (req: Request, res: Response) => {
  const { restaurantNearby } = await import('./controllers/restaurantController');
  restaurantNearby(req, res);
});

app.get('/api/restaurants/:id', async (req: Request, res: Response) => {
  const { getById } = await import('./controllers/restaurantController');
  getById(req, res);
});

app.post('/api/restaurants/:id/like', async (req: Request, res: Response) => {
  const { likeRestaurant } = await import('./controllers/restaurantController');
  likeRestaurant(req, res);
});

app.post('/api/restaurants/:id/unlike', async (req: Request, res: Response) => {
  const { unlikeRestaurant } = await import('./controllers/restaurantController');
  unlikeRestaurant(req, res);
});

// Review Routes
app.post('/api/reviews', async (req: Request, res: Response) => {
  const { createReview } = await import('./controllers/reviewController');
  createReview(req, res);
});

app.get('/api/reviews/restaurant/:restaurantId', async (req: Request, res: Response) => {
  const { getReviewsByRestaurant } = await import('./controllers/reviewController');
  getReviewsByRestaurant(req, res);
});

app.delete('/api/reviews/:id', async (req: Request, res: Response) => {
  const { deleteReview } = await import('./controllers/reviewController');
  deleteReview(req, res);
});

app.post('/api/reviews/:id/helpful', async (req: Request, res: Response) => {
  const { markHelpful } = await import('./controllers/reviewController');
  markHelpful(req, res);
});

// User Routes
app.get('/api/users/:userId', async (req: Request, res: Response) => {
  const { getUserProfile } = await import('./controllers/userController');
  getUserProfile(req, res);
});

app.put('/api/users/:userId/allergies', async (req: Request, res: Response) => {
  const { updateAllergies } = await import('./controllers/userController');
  updateAllergies(req, res);
});

app.get('/api/users/:userId/likes', async (req: Request, res: Response) => {
  const { getUserLikes } = await import('./controllers/userController');
  getUserLikes(req, res);
});

// Verification Routes
app.post('/api/verification/request', async (req: Request, res: Response) => {
  const { requestVerification } = await import('./controllers/verificationController');
  requestVerification(req, res);
});

app.post('/api/verification/:restaurantId', async (req: Request, res: Response) => {
  const { verifyRestaurant } = await import('./controllers/verificationController');
  verifyRestaurant(req, res);
});

app.get('/api/verification/:restaurantId/status', async (req: Request, res: Response) => {
  const { getRestaurantVerificationStatus } = await import('./controllers/verificationController');
  getRestaurantVerificationStatus(req, res);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 TasteMatch API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
