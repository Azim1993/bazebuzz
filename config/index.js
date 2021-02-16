import dotEnv from 'dotenv'
dotEnv.config()

export default {
    apiSecretKey: process.env.API_SECRET_KEY
}