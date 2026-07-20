import { errorResponse } from '../utils/apiResponse.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return errorResponse(res, errors.join(', '), 400);
    }

    req.body = value; // Use validated and sanitized values
    next();
  };
};
