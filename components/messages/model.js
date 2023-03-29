const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is required.'],
        validate: {
            validator: function (v) {
                return v.split(' ').length <= 300 // Validación del maximo de palabras
            },
            message: 'Content cannot be longer than 300 words.'
        }
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required.']
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Receiver is required.']
    },
    status: {
        type: Number,
        default: 1
    }
}, { timestamps: true, versionKey: false })

const Message = mongoose.models.MessageSchema || mongoose.model('Message', MessageSchema, "messages")

module.exports = Message