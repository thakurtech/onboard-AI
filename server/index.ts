import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import onboardingRoutes from './routes/onboarding.routes';
import courseRoutes from './routes/course.routes';
import aiRoutes from './routes/ai.routes';
import interviewerRoutes from './routes/interviewer.routes';
import { createUserTable } from './models/user.model';
import { pool } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Security Headers
app.use(helmet({
    contentSecurityPolicy: isProduction,
    crossOriginEmbedderPolicy: false,
}));

// CORS Configuration
const corsOptions = {
    origin: isProduction
        ? process.env.CORS_ORIGIN?.split(',') || []
        : ['http://localhost:3002', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging in development
if (!isProduction) {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/interviewer', interviewerRoutes);

// Health Check Endpoints
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/health/db', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'ok',
            database: 'connected',
            timestamp: result.rows[0].now
        });
    } catch (error) {
        res.status(503).json({
            status: 'error',
            database: 'disconnected',
            error: (error as Error).message
        });
    }
});

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error('Error:', err);
    res.status(500).json({
        error: isProduction ? 'Internal Server Error' : err.message
    });
});

// Start Server
app.listen(PORT, async () => {
    try {
        console.log(`\n🚀 Server is running on port ${PORT}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔒 CORS enabled for: ${isProduction ? process.env.CORS_ORIGIN : 'localhost:3002,3000'}`);

        await createUserTable().catch(err => {
            console.log('⚠️  Database not connected (optional for development)');
        });

        console.log('✅ Server initialization complete\n');
    } catch (error) {
        console.error('❌ Server startup error:', error);
    }
});
