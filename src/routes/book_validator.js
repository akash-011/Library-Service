const Joi = require('joi');

const validateBook = (book) => {
  const schema = {
    name: Joi.string().min(1).required(),
    author: Joi.string().min(2).required(),
    publishYear: Joi.number().required(),
    pages: Joi.number().required(),
  };
  return Joi.validate(book, schema);
};

module.exports = {
  validateBook,
}