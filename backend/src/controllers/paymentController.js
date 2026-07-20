import paymentService from '../services/paymentService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createCheckout = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const result = await paymentService.createCheckoutSession(req.user.id, courseId);
  return successResponse(res, result, 'Checkout session created');
});

export const handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const result = await paymentService.handleWebhook(req.body, signature);
  return successResponse(res, result);
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const result = await paymentService.verifyPayment(sessionId);
  return successResponse(res, result);
});
