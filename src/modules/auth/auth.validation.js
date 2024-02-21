import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signup=joi.object({
    FirstName:joi.string().min(2).max(20).required().messages({
        'string.base': `FirstName should be a type of 'text'`,
        'string.empty': `FirstName cannot be an empty field`,
        'string.min': `FirstName should have a minimum length of {#limit}`,
        'string.max': `FirstName should have a max length of {#limit}`,
        'any.required': `FirstName is a required field`}),
    LastName:joi.string().min(2).max(20).required().messages({
        'string.base': `LastName should be a type of 'text'`,
        'string.empty': `LastName cannot be an empty field`,
        'string.min': `LastName should have a minimum length of {#limit}`,
        'string.max': `LastName should have a max length of {#limit}`,
        'any.required': `LastName is a required field`}),
    email:generalFields.email.messages({
        'string.email': `Email must be  Valid Email`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`
      }),
    phone: joi.string().pattern(/^[0-9]{11}$/).message('Phone number must be 11 digits').required(), // Example phone validation

    password:generalFields.password.messages({
        'string.pattern.base': `Password should be include A capital letter, a small letter, and a number `,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`
      }),
      repassword:generalFields.cPassword.valid(joi.ref('password')).messages({
        'string.empty': `confirmPassword cannot be an empty field`,
        'any.only': `confirmPassword Not match the password`,
        'any.required': `confirmPassword is a required field`   })
}).required()
export const login = joi.object({
  email: joi.string().email().messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email or phone number is required',
  }),
  phone: joi.string().pattern(/^[0-9]{11}$/).message('Phone number must be 11 digits'),
  password: joi.string().required().messages({
      'string.empty': 'Password cannot be an empty field',
      'any.required': 'Password is a required field',
  }),
}).xor('email', 'phone').required().messages({
  'object.missing': 'Email or phone number is required',
});

export const forgetPassword = joi.object({
  email: joi.string().email().messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email or phone number is required',
  }),
  phone: joi.string().pattern(/^[0-9]{11}$/).message('Phone number must be 11 digits'),
}).xor('email', 'phone').required().messages({
  'object.missing': 'Email or phone number is required',
});
export const CheckCode = joi.object({
  email: joi.string().email().messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email or phone number is required',
  }),
  phone: joi.string().pattern(/^[0-9]{11}$/).message('Phone number must be 11 digits'),
  forgetCode: joi.string().pattern(/^[0-9]{4}$/).required().messages({
      'string.pattern.base': 'Forget code should be a 4-digit number',
      'string.empty': 'Forget code cannot be an empty field',
      'any.required': 'Forget code is a required field',
  }),
}).xor('email', 'phone').required().messages({
  'object.missing': 'Email or phone number is required',
});
     
export const ResetPassword = joi.object({
  email: joi.string().email().messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email or phone number is required',
  }),
  phone: joi.string().pattern(/^[0-9]{11}$/).message('Phone number must be 11 digits'),
  password:generalFields.password.messages({
    'string.pattern.base': `Password should be include A capital letter, a small letter, and a number `,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`
  }),
  repassword:generalFields.cPassword.valid(joi.ref('password')).messages({
    'string.empty': `confirmPassword cannot be an empty field`,
    'any.only': `confirmPassword Not match the password`,
    'any.required': `confirmPassword is a required field`   })
}).xor('email', 'phone').required().messages({
  'object.missing': 'Email or phone number is required',
});


export const token=joi.object({
  token:joi.string().required(),
}).required()