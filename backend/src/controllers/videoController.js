import videoService from '../services/videoService.js';
import { successResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const addVideo = asyncHandler(async (req, res) => {
  const video = await videoService.addVideo(
    req.params.courseId,
    req.user.id,
    req.body
  );
  return successResponse(res, video, 'Video added successfully', 201);
});

export const getCourseVideos = asyncHandler(async (req, res) => {
  const videos = await videoService.getCourseVideos(
    req.params.courseId,
    req.user?.id
  );
  return successResponse(res, videos);
});

export const getVideo = asyncHandler(async (req, res) => {
  const video = await videoService.getVideoById(
    req.params.id,
    req.user?.id
  );
  return successResponse(res, video);
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { watchedSeconds, isCompleted } = req.body;
  await videoService.updateProgress(
    req.user.id,
    req.params.id,
    watchedSeconds,
    isCompleted
  );
  return successResponse(res, null, 'Progress updated');
});

export const deleteVideo = asyncHandler(async (req, res) => {
  await videoService.deleteVideo(req.params.id, req.user.id);
  return successResponse(res, null, 'Video deleted successfully');
});
