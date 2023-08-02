// Import the required modules
const Joi = require("joi");

// validation 
exports.Category = Joi.object({
    name:Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    phone: Joi.number()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
}).options({ allowUnknown: false });