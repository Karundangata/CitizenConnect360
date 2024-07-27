import Joi from 'joi'

export const registerSchema = Joi.object({
    name:Joi.string().min(3).required().messages({
        'string.base': 'Name inputte should be a type of text',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of {#limit}',
        'any.required': 'Name is required'
      }),
    email:Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
      }),
    //terms of service
    acceptTos:Joi.boolean().truthy('yes').valid(true).required().messages({
        'boolean.base': 'Terms of service must be accepted',
        'any.only': 'You must accept the terms of service',
        'any.required': 'Acceptance of terms of service is required'
      }),
      password:Joi.string().min(6).max(12).required()
      .pattern(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
      )
      .messages({
          'string.base': 'Password should be a type of text',
          'string.empty': 'Password is required',
          'string.min': 'Password should have a minimum length of {#limit}',
          'string.max': 'Password should have a maximum length of {#limit}',
          'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
          'any.required': 'Password is required'
        })

})


// whereby user doesnt rememeber old password and wants to set anew
export const forgotPasswordSchema = Joi.object({
    email:Joi.string().email().required().messages({
      'string.base': 'Email should be a type of text',
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    })

})


// whereby user remebers old password and voluntarily wants to change it
export const changePasswordSchema = Joi.object({

    newPassword:Joi.string().min(6).max(10).required()
    .pattern(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
    )
    .messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of {#limit}',
        'string.max': 'Password should have a maximum length of {#limit}',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
        'any.required': 'Password is required'
      }),

      confirmNewPassword:Joi.ref('newPassword')

})
