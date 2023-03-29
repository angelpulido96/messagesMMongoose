const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const response = require('../../network/responses')
const { createMessage, getMessages } = require('./service')

router.get('/:user/:receiver', async (req, res) => {
  const { user, receiver } = req.params
  let errorMessage = 'Unexpected error has occurred'
  try {
    const getMessage = await getMessages(user, receiver)
    if (getMessage.error) {
      throw getMessage.error
    }

    response.success(req, res, 'Lista de mensajes', 200, getMessage)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

router.post('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {
    const createdMessage = await createMessage(data)
    if (createdMessage.error) {
      throw createdMessage.error
    }

    response.success(req, res, 'Mensaje creado', 201, createdMessage)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorValues = Object.values(error.errors)
      errorMessage = errorValues.length > 0 ? errorValues[0].message : 'Validation error'
    }
    response.error(req, res, errorMessage, 401, error.message)
  }
})

module.exports = router