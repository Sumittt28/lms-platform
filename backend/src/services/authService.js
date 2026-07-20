import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';
import config from '../config/env.js';

class AuthService {
  async register({ email, password, fullName, role = 'student' }) {
    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw { statusCode: 400, message: 'Email already registered' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const userId = uuidv4();
    const result = await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, full_name, role, created_at`,
      [userId, email, passwordHash, fullName, role]
    );

    const user = result.rows[0];
    const token = this.generateToken(user);

    return { user: this.sanitizeUser(user), token };
  }

  async login({ email, password }) {
    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    const token = this.generateToken(user);

    return { user: this.sanitizeUser(user), token };
  }

  async getProfile(userId) {
    const result = await pool.query(
      'SELECT id, email, full_name, role, avatar_url, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return this.sanitizeUser(result.rows[0]);
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );
  }

  sanitizeUser(user) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      avatarUrl: user.avatar_url,
      createdAt: user.created_at
    };
  }
}

export default new AuthService();
