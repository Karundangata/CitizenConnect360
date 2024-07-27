import Joi from 'joi'

export const voteSchema = Joi.object({
    userId:Joi.string().required().messages({
        'string.base': 'User ID should be a type of text',
        'string.empty': 'User ID is required',
        'any.required': 'User ID is required'
    }),

    pollId:Joi.string().required().messages({
      'string.base': 'Poll ID should be a type of text',
      'string.empty': 'Poll ID is required',
      'any.required': 'Poll ID is required'
    }),

    choiceMade:Joi.string().required().messages({
        'string.base': 'choiceMade should be a type of text',
        'string.empty': 'choiceMade is required',
        'any.required': 'choiceMade is required'
    })
})
