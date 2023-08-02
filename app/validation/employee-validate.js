// Import the required modules
const Joi = require("joi");

// validation 
exports.Employee = Joi.object({
    role_id: Joi.string()
        .required(),
    name:Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    date_of_joining: Joi.date(),
    address: Joi.string()
}).options({ allowUnknown: false });