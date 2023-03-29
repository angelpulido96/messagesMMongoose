const express = require('express')
const mongoose = require('mongoose')
const { createUser, getUsers } = require('./service')
const router = express.Router()
const response = require('../../network/responses')

router.get('/', async (req, res) => {
  const { search, limit, offset } = req.query
  let filters = {
    search,
    limit,
    offset,
  }
  let errorMessage = 'Unexpected error has occurred'
  try {

    const getUser = await getUsers(filters)
    if (getUser.error) {
      throw getUser.error
    }
    response.success(req, res, 'User', 200, getUser)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

router.post('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {
    const createdUser = await createUser(data)
    if (createdUser.error) {
      throw createdUser.error
    }
    response.success(req, res, 'User created', 201, createdUser)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorValues = Object.values(error.errors)
      errorMessage = errorValues.length > 0 ? errorValues[0].message : 'Validation error'
    } else if (error.code === 11000) {
      errorMessage = 'The email is already in use'
    }
    response.error(req, res, errorMessage, 500, error.message)
  }
})

module.exports = router