// animal-ngo-backend/src/middlewares/validation.js
import { findUserByEmail } from '../models/userModel.js';
import pool from '../config/db.js'; // Needed to check volunteer status

// ----------------------------------------------------
// Middleware to validate data when creating a new rescue case (POST /api/rescue)
// ----------------------------------------------------
export const validateRescueCase = (req, res, next) => {
    const { title, description, latitude, longitude } = req.body;
    
    // Check for required fields
    if (!title || !description || latitude == null || longitude == null) {
        return res.status(400).json({ 
            success: false,
            message: 'Title, description, latitude, and longitude are required' 
        });
    }

    // Check for valid coordinates
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({ success: false, message: 'Invalid coordinates' });
    }

    // Input seems valid, proceed to controller
    next();
};

// ----------------------------------------------------
// Middleware to check if the user is a volunteer
// ----------------------------------------------------
export const checkVolunteerRole = (req, res, next) => {
    // We get the user data from req.user, which was set by verifyToken middleware (Day 2)
    if (!req.user || req.user.role !== 'volunteer') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Only volunteers can access this feature.' 
        });
    }
    next();
};

// ----------------------------------------------------
// Middleware to validate rescue case status updates
// ----------------------------------------------------
export const validateStatusUpdate = (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ['assigned', 'resolved', 'pending']; // Assuming 'resolved' and 'pending' for user updates
    
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value. Must be pending, assigned, or resolved.' });
    }

    next();
};