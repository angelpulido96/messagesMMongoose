const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const response = require('../../network/responses')
const { createChat } = require('./service')

router.get('/', (req, res) => {
  try {

  } catch (error) {

  }
})

router.post('/', async (req, res) => {
  const { partakers } = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {
    const users = createChat(partakers)
    if (users.error) {
      throw users.error
    }

    response.success(req, res, 'Chat creado', 201, users)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorValues = Object.values(error.errors)
      errorMessage = errorValues.length > 0 ? errorValues[0].message : 'Validation error'
    }
    response.error(req, res, errorMessage, 401, error.message)
  }
})

module.exports = router