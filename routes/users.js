import express from 'express';
import { getUserProfile, login, register } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/user/:id', getUserProfile)
router.post("/register", register)
router.post("/login", login)

export { router as userRouter };

