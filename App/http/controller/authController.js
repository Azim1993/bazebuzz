import User from '@models/user'
import {registerValidateSchema, loginValidateSchema} from '@requests/authRequest'

const register = async (req, res) => {
    const {error} = registerValidateSchema(req.body)
    if (error) return res.status(422).send(error.details[0].message)
    const uniqueEmailCheck = await User.findOne({email: req.body.email})
    if (uniqueEmailCheck) return res.status(400).send({error: 'User already registered'})

    try {
        const user = await User.create(req.body)
        const token = user.generateAuthToken()
        return res.status(201).json({ 
            message: 'User registered successfully',
            data: {
                user: user,
                token: token
            }
        })
    }
    catch (error) {
        console.log(error.message)
    }
};

const login = async (req, res) => {
    const {error} = loginValidateSchema(req.body)
    if (error) return res.status(422).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(422).send({error: 'Oops! email or password are incorrect.'})

    const match = await user.matchPassword(req.body.password)
    if (!match) return res.status(422).send({error: 'Oops! email or password are incorrect.'})

    return res.status(201).json({ 
        message: 'User Login successfully',
        data: {
            user: {
                _id: user._id,
                name: user.name,
                createdAt: user.createdAt
            },
            token: user.generateAuthToken()
        }
    })
};

export default {
  register,
  login,
};
