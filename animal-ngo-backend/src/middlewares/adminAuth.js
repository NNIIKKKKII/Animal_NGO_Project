/**
 * Middleware to ensure the authenticated user has the 'admin' role.
 * Assumes that authMiddleware has already run and populated req.user.
 */
const requireAdmin = (req, res, next) => {
    // Ensure user object exists (e.g., failed basic auth check)
    if (!req.user) {
        return res.status(401).json({ 
            message: "Authentication required." 
        });
    }

    // Check for the admin role
    if (req.user.role !== 'admin') {
        // Log the attempted access
        console.warn(`Unauthorized admin access attempt by user: ${req.user.id}, role: ${req.user.role}`);
        return res.status(403).json({ 
            message: "Access forbidden: Requires Administrator privileges." 
        });
    }

    next();
};

module.exports = requireAdmin;