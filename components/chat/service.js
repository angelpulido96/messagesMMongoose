const Chat = require('../chat/model')
const User = require('../users/model')

const getChats = () => {
  try {

  } catch (error) {

  }
}

const createChat = async (partakers) => {
  let response = {
    created: false
  }
  try {

    const users = await User.find({ _id: { $in: partakers } })

    const createdChat = new Chat(users)
    await createdChat.save()

    response.created = true
  } catch (error) {
    response.error = error
  }
  return response
}

module.exports = {
  getChats,
  createChat
}