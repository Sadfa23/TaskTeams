import express from 'express';
import { signup,login, getUserProfile, getAllUsers } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/login/users/user', authMiddleware,getUserProfile)
router.get('/login/users', getAllUsers)

export default router