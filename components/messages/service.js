const Message = require('./model')

const getMessages = async (user, receiver) => {
    let response = {
        messages: []
    }
    try {

        const getMessages = await Message
            .find({ sender: user, receiver })
            .populate({
                path: 'receiver',
                select: 'name -_id' // <---------------'-_id' exclude _id field. OR { name: 1, _id: 0 }
            })

        response.messages = getMessages
    } catch (error) {
        response.error = error
    }
    return response
}

const createMessage = async (data) => {
    let response = {
        created: false
    }
    try {
        const createdMessage = new Message(data)
        await createdMessage.save()

        response.created = true
    } catch (error) {
        response.error = error
    }
    return response
}

module.exports = {
    getMessages,
    createMessage
}