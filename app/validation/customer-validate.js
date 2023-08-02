// Import the required modules
const Joi = require("joi");

// validation 
exports.Customer = Joi.object({
    name:Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    phone: Joi.number()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    date_of_opening: Joi.date(),
    address: Joi.string()
}).options({ allowUnknown: false });