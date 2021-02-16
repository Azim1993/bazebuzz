import Express from 'express'
import routers from '@routers/index'

const app = Express();
import '@services/mongoDB'

app.use(Express.json());
app.use('/', routers);

app.listen('5000', () => {
  console.log("BazeBuzz is listening to port 5000 successfully")
})
