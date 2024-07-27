import Joi from 'joi'

export const viewSchema = Joi.object({
    title:Joi.string().required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
      }),

    description:Joi.string().required().messages({
      'string.base': 'Description should be a type of text',
      'string.empty': 'Description is required',
      'any.required': 'Description is required'
    }),

    body:Joi.string().required().messages({
      'string.base': 'Body should be a type of text',
      'string.empty': 'Body is required',
      'any.required': 'Body is required'
    }),

    location:Joi.string().required().messages({
      'string.base': 'Location should be a type of text',
      'string.empty': 'Location is required',
      'any.required': 'Location is required'
    }),

    imageUrl:Joi.string().required().messages({
      'string.base': 'Image URL should be a type of text',
      'string.empty': 'Image URL is required',
      'any.required': 'Image URL is required'
    }),

    userId:Joi.string().required().messages({
      'string.base': 'User ID should be a type of text',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required'
    })


})
