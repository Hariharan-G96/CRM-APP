require('./crons/cron')
const dbConfig = require('./configs/db.config')
const mongoose = require('mongoose')
const express = require('express')

const app = express()

app.use(express.json())

mongoose.connect(dbConfig.DB_URL,
    () => console.log("Connected to MongoDB"),
    (err) => console.log("Error in connecting to MongoDB: ", err.message))

require('./routes/ticketNotification.route')(app)

app.listen(3030, () => console.log("App is listening to the port : 3030"))