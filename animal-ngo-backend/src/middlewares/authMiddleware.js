// animal-ngo-backend/src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Check for the token in the Authorization header (Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Extract the token (remove "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key from your .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user's data (id, role) to the request object
    req.user = decoded; 
    
    // Proceed to the next controller function
    next();
  } catch (ex) {
    // If verification fails (e.g., token expired or invalid)
    res.status(400).json({ message: 'Invalid token.' });
  }
};