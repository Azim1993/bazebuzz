import Joi from 'joi'

const registerValidateSchema = (userRequest) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(userRequest)
}

const loginValidateSchema = (userRequest) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(userRequest)
}

export { 
    registerValidateSchema,
    loginValidateSchema
}