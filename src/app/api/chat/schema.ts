import Joi from "joi";

export const messageSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }), // UUID v4
  role: Joi.string().valid("user", "ai"), // Only allows 'user' or 'ai'
  message: Joi.string(), // String type with no specific validation
  ratingStatus: Joi.number().integer().valid(-1, 0, 1), // Only allows -1, 0, or 1
  feedback: Joi.string(), // String type
  messageHistoryId: Joi.string().guid({ version: "uuidv4" }), // UUID v4
});

export const messageSchemaPOST = Joi.object({
  role: Joi.string().valid("user", "ai").required(), // Only allows 'user' or 'ai'
  message: Joi.string().required(), // String type with no specific validation
  messageHistoryId: Joi.string().guid({ version: "uuidv4" }).required(), // UUID v4
});

export const messageSchemaDELETE = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }), // UUID v4
});

export const messageSchemaPATCHFeedback = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }), // UUID v4
  ratingStatus: Joi.number().integer().valid(-1, 0, 1), // Only allows -1, 0, or 1
  feedback: Joi.string(), // String type
});
