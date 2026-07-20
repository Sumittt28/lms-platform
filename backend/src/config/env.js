import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  vimeoAccessToken: process.env.VIMEO_ACCESS_TOKEN,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};

// Validate required env vars
const required = ['DATABASE_URL', 'JWT_SECRET', 'STRIPE_SECRET_KEY'];
for (const key of required) {
  if (!process.env[key]) {
    console.warn(`⚠️  Warning: ${key} is not set`);
  }
}

export default config;
