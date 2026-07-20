import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid('student', 'instructor').default('student')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const courseSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  categoryId: Joi.string().uuid().optional(),
  thumbnailUrl: Joi.string().uri().optional()
});

export const videoSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().optional(),
  vimeoVideoId: Joi.string().required(),
  durationSeconds: Joi.number().integer().min(0).optional(),
  position: Joi.number().integer().min(1).required(),
  isPreview: Joi.boolean().default(false)
});
