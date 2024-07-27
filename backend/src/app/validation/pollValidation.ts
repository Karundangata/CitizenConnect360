import Joi from 'joi'

export const pollSchema = Joi.object({
    title:Joi.string().required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
      }),

    userId:Joi.string().required().messages({
      'string.base': 'User ID should be a type of text',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required'
    }),

    choices: Joi.array().items(
      Joi.string()
        .regex(/^[^,]+$/) // Regex prevents having any commas within words.
        .messages({
          'string.pattern.base': 'Each choice should not contain commas'
        })
        .min(2) // Ensure there are at least 2 choices
        .messages({
          'array.items.min': 'At least 2 choices are required'
        })
        .required()
    ).required().messages({
      'array.base': 'Choices should be an array',
      'array.empty': 'Choices array cannot be empty',
      'any.required': 'Choices are required'
    })
})
