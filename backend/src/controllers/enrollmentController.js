import enrollmentService from '../services/enrollmentService.js';
import { successResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getMyCourses = asyncHandler(async (req, res) => {
  const courses = await enrollmentService.getEnrolledCourses(req.user.id);
  return successResponse(res, courses);
});

export const checkEnrollment = asyncHandler(async (req, res) => {
  const isEnrolled = await enrollmentService.checkEnrollment(
    req.user.id,
    req.params.courseId
  );
  return successResponse(res, { isEnrolled });
});
