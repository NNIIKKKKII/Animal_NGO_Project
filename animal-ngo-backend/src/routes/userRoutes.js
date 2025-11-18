// animal-ngo-backend/src/routes/userRoutes.js
import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserById, 
  updateUser, 
  setUserLocation, 
  getNearbyUsers,
  logoutUser,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes for Authentication
router.post('/register', registerUser); 
router.post('/login', loginUser); 
router.post('/logout', logoutUser); // Will be implemented later

// Protected routes (Require the verifyToken middleware)
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.put('/location/:id', verifyToken, setUserLocation);
router.get('/nearby', verifyToken, getNearbyUsers);

// Admin/Protected routes
router.delete("/:id", verifyToken, deleteUser);
router.get("/", verifyToken, getAllUsers);

export default router;