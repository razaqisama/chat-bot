import Joi from "joi";

export const messageHistorySchemaGET = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }), // UUID v4
});

export const messageHistorySchemaPOST = Joi.object({
  title: Joi.string().required(), // String type with no specific validation
});

export const messageHistorySchemaDELETE = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }), // UUID v4
});
