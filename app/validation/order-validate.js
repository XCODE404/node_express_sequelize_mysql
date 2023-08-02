// Import the required modules
const Joi = require("joi");

// validation
exports.Order = Joi.object({
    customer_id: Joi.string()
        .required(),
    name:Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    order_date: Joi.date(),
    order_complete_date: Joi.date(),
    order_status: Joi.string()
}).options({ allowUnknown: false });