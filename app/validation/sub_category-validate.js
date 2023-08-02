// Import the required modules
const Joi = require("joi");

// validation
exports.SubCategory = Joi.object({
    category_id: Joi.string()
        .required(),
    name:Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    status: Joi.string()
}).options({ allowUnknown: false });