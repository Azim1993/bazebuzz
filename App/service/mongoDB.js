import mongoose from 'mongoose'
import DB from '@config/database'

mongoose
    .connect(`${DB.mongoDB.host}/${DB.mongoDB.dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(() => console.log(`Connected to ${DB.mongoDB.host}/${DB.mongoDB.dbName}...`))
    .catch(err => console.error('Could not connect to MongoDB...' . JSON.stringify(err.message)))
