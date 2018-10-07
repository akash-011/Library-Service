const { celebrate, Joi } = require('celebrate');


const createBook = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    publishYear: Joi.number().required(),
    pages: Joi.number().integer().required(),
  }),
});

const bookUpdate = celebrate({
  body: Joi.object().keys({
    publishYear: Joi.number().integer(),
    pages: Joi.number().integer(),
  }),
});

module.exports = {
  createBook,
  bookUpdate,
};
