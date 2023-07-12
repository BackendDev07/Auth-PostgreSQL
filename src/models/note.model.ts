import Joi from 'joi'

const noteScheme = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
})

export default {
  noteScheme,
}
