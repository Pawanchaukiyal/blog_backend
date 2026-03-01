import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";

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
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorMiddleware);

export default app;