import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes/index.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import config from './config/env.js';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Body parsing (except for webhook route which needs raw body)
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorMiddleware);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
});

export default app;
