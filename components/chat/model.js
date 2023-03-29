const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]

}, { timestamps: true, versionKey: false })

const Chat = mongoose.models.ChatSchema || mongoose.model('Chat', ChatSchema, "Chats")

module.exports = Chat