import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create instructor
    const instructorId = uuidv4();
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING`,
      [instructorId, 'instructor@test.com', hashedPassword, 'John Instructor', 'instructor']
    );
    console.log('✅ Created instructor: instructor@test.com / password123');

    // Create student
    const studentId = uuidv4();
    await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING`,
      [studentId, 'student@test.com', hashedPassword, 'Jane Student', 'student']
    );
    console.log('✅ Created student: student@test.com / password123');

    // Get category
    const categoryResult = await pool.query('SELECT id FROM categories LIMIT 1');
    const categoryId = categoryResult.rows[0]?.id || null;

    // Create sample courses
    const courses = [
      {
        title: 'Complete React Course 2024',
        description: 'Learn React from scratch. Build real-world projects with React, Redux, and React Router. Perfect for beginners and intermediate developers.',
        price: 29.99
      },
      {
        title: 'Node.js & Express Masterclass',
        description: 'Master backend development with Node.js and Express. Learn REST APIs, authentication, database integration, and deployment.',
        price: 39.99
      },
      {
        title: 'Full-Stack Web Development Bootcamp',
        description: 'Become a full-stack developer. Learn HTML, CSS, JavaScript, React, Node.js, PostgreSQL, and more. Build 10+ projects.',
        price: 49.99
      }
    ];

    for (const course of courses) {
      await pool.query(
        `INSERT INTO courses (id, instructor_id, category_id, title, description, price, is_published)
         VALUES ($1, $2, $3, $4, $5, $6, true)`,
        [uuidv4(), instructorId, categoryId, course.title, course.description, course.price]
      );
    }
    console.log('✅ Created 3 sample courses');

    console.log('');
    console.log('🎉 Seeding complete!');
    console.log('');
    console.log('Test accounts:');
    console.log('  Instructor: instructor@test.com / password123');
    console.log('  Student: student@test.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
