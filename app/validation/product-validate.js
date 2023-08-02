// Import the required modules
const Joi = require("joi");

// validation 
exports.Product = Joi.object({
    category_id: Joi.string()
        .required(),
    sub_category_id: Joi.string()
        .required(),
    name:Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    price: Joi.number()
        .precision(2),
    quantity: Joi.number()
        .precision(2),
    status: Joi.string()
}).options({ allowUnknown: false });