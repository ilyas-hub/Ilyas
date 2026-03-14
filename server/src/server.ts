import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';

// Route imports
import contactRoutes from './routes/contact.routes';
import projectRoutes from './routes/project.routes';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Express = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running!',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  Portfolio Server is running!
  ================================
  Port: ${PORT}
  Mode: ${process.env.NODE_ENV || 'development'}
  Health: http://localhost:${PORT}/api/health
  ================================
  `);
});

export default app;
