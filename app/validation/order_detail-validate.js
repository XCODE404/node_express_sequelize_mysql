// Import the required modules
const Joi = require("joi");

// validation 
exports.OrderDetail = Joi.object({
    order_id: Joi.string()
        .required(),
    item: Joi.string()
        .required(),
    quantity: Joi.number()
        .precision(2),
    price: Joi.number()
        .precision(2),
    discount: Joi.number()
        .precision(2),
}).options({ allowUnknown: false });