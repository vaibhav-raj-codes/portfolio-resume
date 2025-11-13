const Joi = require('joi');

module.exports.portfolioSchema = Joi.object({
  portfolio: Joi.object({
    fullName: Joi.string().required(),
    bio: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    skills: Joi.string().required(), // will be split into array later
    education: Joi.array().items(
      Joi.object({
        degree: Joi.string().required(),
        institution: Joi.string().required(),
        year: Joi.number().required()
      })
    ).min(1).required(),
    socialLinks: Joi.object({
      linkedin: Joi.string().uri().required(),
      github: Joi.string().uri().required()
    }).required(),
    // experience and projects are optional
    experience: Joi.array().items(
      Joi.object({
        role: Joi.string().allow('', null),
        company: Joi.string().allow('', null),
        duration: Joi.string().allow('', null),
        description: Joi.string().allow('', null)
      })
    ).optional(),
    projects: Joi.array().items(
      Joi.object({
        title: Joi.string().allow('', null),
        description: Joi.string().allow('', null),
        link: Joi.string().allow('', null)
      })
    ).optional()
  }).required()
});
