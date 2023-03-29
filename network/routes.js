const user = require('../components/users/controller')
const message = require('../components/messages/controller')

const routes = (app) => {
    app.use('/api/users', user)
    app.use('/api/messages', message)
}

module.exports = routes