import express from 'express';
import { deleteController, getByIdController, getUserController, registerUser, updateController } from '../controllers/userController.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);
router.get('/getuser', getUserController);
router.get('/singleuser/:_id', getByIdController); // Get user by ID
router.put('/update/:id', updateController); // Update user by ID
router.delete('/delete/:id', deleteController); // Delete user by ID

export default router;
