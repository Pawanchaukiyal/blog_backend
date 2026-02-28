import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

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

// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        success: true,
        message: 'API is healthy',
    })
});

app.use(errorMiddleware);

export default app;