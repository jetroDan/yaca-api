require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const database = require('../db')
const userRoute = require('../routes/user');
const cors = require('cors');

// const events = require('../router/events')
// const AppNotification = require('../lib/runNotification')

app.use(cors());
app.use(express.urlencoded({ limit: '32MB', extended: true }));
app.use(express.json({ limit: '32MB', extended: true }))
app.use('/rest/v1/user', userRoute)

// AppNotification.runNotification(true,0)
const run = async () => {
	await database.initialize()
  app.listen(port, () => {
    console.log(`server express runing in ${port}`)
  })
}

run();