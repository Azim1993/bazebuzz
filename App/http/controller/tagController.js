import Tag from '@models/tag'
import Joi from 'joi'

const index = async ( req, res) => {
    try {
        const tags = await Tag.find()
        res.send({
            message: 'All tag list',
            data: tags
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

const store = async ( req, res) => {
    const {error} = Joi.object({
        name: Joi.string().min(1).max(50).required(),
    }).validate(req.body)
    if (error) return res.status(422).send(error.details[0].message)
    try {
        let newTag = await new Tag({ name: req.body.name }).save();
        res.status(201).send({
            message: 'Tag created successfully',
            data: newTag
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

export default {
    index,
    store
}