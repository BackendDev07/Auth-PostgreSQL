import Joi from 'joi'

const registerScheme = Joi.object({
  name: Joi.string().required().min(3).max(50),
  surname: Joi.string().required().min(3).max(50),
  username: Joi.string().required().min(3).max(50),
  password: Joi.string().required().min(3),
})

const loginScheme = Joi.object({
  username: Joi.string().required().min(3).max(50),
  password: Joi.string().required().min(3),
})

export default {
  registerScheme,
  loginScheme,
}
