import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export default (data, required = []) => Joi.object().keys({
  username: Joi.string().min(2).max(60),
  email: Joi.string().min(3).max(70).required()
    .email(),
  password: joiPassword
    .string()
    .min(8)
    .max(50)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .messages({
      'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
      'password.minOfSpecialCharacters':
        '{#label} should contain at least {#min} special character',
      'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
      'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
      'password.noWhiteSpaces': '{#label} should not contain white spaces',
    }),
})
  .fork(required, (field) => field.required())
  .validateAsync(data);
