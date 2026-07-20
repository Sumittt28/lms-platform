import authService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { email, password, fullName, role } = req.body;
  const result = await authService.register({ email, password, fullName, role });
  return successResponse(res, result, 'Registration successful', 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  return successResponse(res, result, 'Login successful');
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  return successResponse(res, user);
});
