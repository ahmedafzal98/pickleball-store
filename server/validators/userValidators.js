const Joi = require("joi");

const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(data, { abortEarly: false });
};
module.exports = { validateUser };
