import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import {hashSync, compare} from 'bcryptjs'
import config from '@config'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: Date,
    emailConfirmedAt: {
        type: Date,
        required: false
    }
})

UserSchema.pre('save', function (next) {
    this.password = hashSync(this.password)
    next()
})

UserSchema.methods.generateAuthToken = function() { 
    return jwt.sign({ _id: this._id, name: this.name}, config.apiSecretKey)
}
/**
 * Match user password
 * @param $password
 * @returns Promise or boolean
 */
UserSchema.methods.matchPassword = function($password) {
    return compare($password, this.password)
}
const User = mongoose.model('User', UserSchema)

export default User