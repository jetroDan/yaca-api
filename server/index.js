const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express')
const app = express()
const port = process.env.PORT
const database = require('../db')
const userRoute = require('../routes/v1/user');
const cors = require('cors');
const swaggerDocs = require('../routes/swagger')

app.use(cors());
app.use(express.urlencoded({ limit: '32MB', extended: true }));
app.use(express.json({ limit: '32MB', extended: true }))
app.use('/api/rest/v1/user', userRoute)

// AppNotification.runNotification(true,0)
const run = async () => {
	await database.initialize()
  app.listen(port, () => {
    swaggerDocs.swaggerDocs(app,port)
    console.log(`server express runing in ${port}`)
  })
}

run();