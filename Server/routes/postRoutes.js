import express from 'express';
import PostController from '../controllers/postController.js';
import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/accessTokenAutoRefresh.js';

const router = express.Router();

// Public Routes
router.get('/all-posts',PostController.getAllPosts);

// Protected Routes
router.post('/create-post', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), PostController.createPost);
router.get('/user-posts', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), PostController.getUserPosts);
router.delete('/delete-post/:id', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), PostController.deletePost);
router.post('/submit-booking',accessTokenAutoRefresh,passport.authenticate('jwt',{session:false}),PostController.submitBookingRequest);

export default router;
