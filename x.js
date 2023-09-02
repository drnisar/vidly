const Joi = require("joi");
let util = require("util");

const validateCustomer = function (customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(customer);
};

const obj = validateCustomer({ name: "" });

console.log(obj);
