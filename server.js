const express = require('express')
const chalk = require('chalk')
const connectionDB = require('./db')
const routes = require('./network/routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

routes(app)

app.listen(3000, (error) => {
    if (error) console.log(chalk.red('[Connection error]'))
    console.log(chalk.blue('The app is on http://localhost:3000'))
    connectionDB()
})