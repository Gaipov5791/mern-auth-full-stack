import express from "express";
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserprofile, } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserprofile);

export default router;