// src/middlewares/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${req.method} ${req.url} →`, err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        message,
        // only show stack trace in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export default errorMiddleware;