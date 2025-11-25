// src/middlewares/requireAdmin.js
export const requireAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }
    if (req.user.role !== "admin") {
      console.warn(`Unauthorized admin access attempt by user: ${req.user.id}, role: ${req.user.role}`);
      return res.status(403).json({ message: "Access forbidden: Administrator privileges required." });
    }
    next();
  };
  