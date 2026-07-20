import { errorResponse } from '../utils/apiResponse.js';

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'You do not have permission to perform this action', 403);
    }

    next();
  };
};

// Shorthand middlewares
export const isInstructor = authorize('instructor', 'admin');
export const isAdmin = authorize('admin');
export const isStudent = authorize('student', 'instructor', 'admin');
