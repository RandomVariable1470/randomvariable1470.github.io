import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import contactRoutes from './routes/contact.js';
import githubRoutes from './routes/github.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust Proxy (Required for Rate Limiting behind Render/Heroku Load Balancer)
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cors());

// Security Middleware
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

// 1. Set Security HTTP Headers
app.use(helmet());

// 2. Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// 3. Rate Limiting (Prevent Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Strict Rate Limiting for Login (Max 5 attempts per hour)
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again after an hour.'
});
app.use('/api/auth/login', loginLimiter);

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/projects', projectRoutes);


app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
