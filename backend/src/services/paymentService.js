import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';
import config from '../config/env.js';
import enrollmentService from './enrollmentService.js';

const stripe = new Stripe(config.stripeSecretKey);

class PaymentService {
  async createCheckoutSession(userId, courseId) {
    // Get course details
    const courseResult = await pool.query(
      'SELECT * FROM courses WHERE id = $1 AND is_published = true',
      [courseId]
    );

    if (courseResult.rows.length === 0) {
      throw { statusCode: 404, message: 'Course not found' };
    }

    const course = courseResult.rows[0];

    // Check if already enrolled
    const enrollmentResult = await pool.query(
      'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    if (enrollmentResult.rows.length > 0) {
      throw { statusCode: 400, message: 'You are already enrolled in this course' };
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description?.substring(0, 500),
            },
            unit_amount: Math.round(course.price * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${config.frontendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendUrl}/course/${courseId}`,
      metadata: {
        userId,
        courseId,
      },
    });

    // Create pending payment record
    await pool.query(
      `INSERT INTO payments (id, user_id, course_id, stripe_session_id, amount, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')`,
      [uuidv4(), userId, courseId, session.id, course.price]
    );

    return { sessionId: session.id, url: session.url };
  }

  async handleWebhook(payload, signature) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        config.stripeWebhookSecret
      );
    } catch (err) {
      throw { statusCode: 400, message: `Webhook signature verification failed: ${err.message}` };
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.handleSuccessfulPayment(session);
    }

    return { received: true };
  }

  async handleSuccessfulPayment(session) {
    const { userId, courseId } = session.metadata;

    // Start transaction
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Create enrollment
      const enrollmentId = await enrollmentService.enrollUser(userId, courseId, client);

      // Update payment record
      await client.query(
        `UPDATE payments 
         SET stripe_payment_id = $1, enrollment_id = $2, status = 'completed'
         WHERE stripe_session_id = $3`,
        [session.payment_intent, enrollmentId, session.id]
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async verifyPayment(sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      return { success: true, courseId: session.metadata.courseId };
    }

    return { success: false };
  }
}

export default new PaymentService();
