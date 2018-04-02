let Joi = require('joi');

module.exports = {
  create: {
    body: {
      name: Joi.string().required(),
      lastName: Joi.allow(null),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      phone: Joi.allow(null),
      type: Joi.string().required(),
      gender: Joi.allow(null),
      address: Joi.string().required(),
      pin: Joi.string().length(4).regex(/^[0-9]+$/).required(),
      password: Joi.string().min(8).max(20).regex(/[A-Z]/).regex(/[0-9]/).regex(/[!@#$%^&*()_+.,;:?]/).required(),
      fkCommerceType: Joi.allow(null),
      fkLocation: Joi.number().required(),
      rif: Joi.allow(null),
      docId: Joi.allow(null),
      profilePicture: Joi.allow(null),
      birthDate: Joi.allow(null)
    }
  }
};