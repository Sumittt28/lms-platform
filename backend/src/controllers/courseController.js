import courseService from '../services/courseService.js';
import { successResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllCourses = asyncHandler(async (req, res) => {
  const { page, limit, categoryId, search } = req.query;
  const result = await courseService.getAllCourses({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 12,
    categoryId,
    search
  });
  return successResponse(res, result);
});

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await courseService.getCourseById(
    req.params.id,
    req.user?.id
  );
  return successResponse(res, course);
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await courseService.createCourse(req.user.id, req.body);
  return successResponse(res, course, 'Course created successfully', 201);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await courseService.updateCourse(
    req.params.id,
    req.user.id,
    req.body
  );
  return successResponse(res, course, 'Course updated successfully');
});

export const deleteCourse = asyncHandler(async (req, res) => {
  await courseService.deleteCourse(req.params.id, req.user.id);
  return successResponse(res, null, 'Course deleted successfully');
});

export const getInstructorCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.getInstructorCourses(req.user.id);
  return successResponse(res, courses);
});
