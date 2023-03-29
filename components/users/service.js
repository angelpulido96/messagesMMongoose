const User = require('./model')

const getUsers = async (filters) => {
  let response = {
    users: []
  }
  try {
    const newFilters = {
      status: 1,
      $or: [
        { name: { $regex: filters.search, $options: 'i' } },
        { firstLastName: { $regex: filters.search, $options: 'i' } },
        { secondLastName: { $regex: filters.search, $options: 'i' } }
      ]
    }
    const offset = filters.limit * filters.offset
    const getUser = await User
      .find(newFilters)
      .sort({ 'createdAt': -1 })
      .skip(offset)
      .limit(filters.limit)

    response.users = getUser
  } catch (error) {
    response.error = error
  }
  return response
}

const createUser = async (data) => {
  let response = {
    created: false
  }
  try {
    const createdUser = new User(data)
    await createdUser.save()

    response.created = true
  } catch (error) {
    response.error = error
  }
  return response
}

module.exports = {
  getUsers,
  createUser
}