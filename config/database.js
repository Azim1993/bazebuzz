import dotEnv from 'dotenv'
dotEnv.config()

export default {
    mongoDB: {
        host: process.env.MONGO_DB_HOST || 'mongodb://localhost',
        dbName: process.env.MONGO_DB_NAME
    }
}