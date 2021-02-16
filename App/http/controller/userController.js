import User from '@models/user'

const getUsers = async (req, res) => {
    const users = await User.find().select('-password')
    return res.send(users)
}

export default {
    getUsers
}