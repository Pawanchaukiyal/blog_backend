import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import AppError from "./utils/AppError.js";
import errorMiddleware from './middlewares/error.middleware.js';
const app = express();

// Middleware
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(errorMiddleware);

// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        success: true,
        message: 'API is healthy',
    })
});

export default app;