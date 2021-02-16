import Joi from 'joi'
import objectId from 'joi-objectid'
Joi.objectId = objectId(Joi);

const categoryValidation = (categoryRequest) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        parentID: Joi.objectId().allow(null)
    })
    return schema.validate(categoryRequest)
}

export {
    categoryValidation
}