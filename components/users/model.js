const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    set: function (v) {
      return v.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Primer letra en mayúscula
      }).join(' ')
    }
  },
  firstLastName: {
    type: String,
    required: [true, 'The firstLasName is required'],
    set: function (v) {
      return v.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Primer letra en mayúscula
      }).join(' ')
    }
  },
  secondLastName: {
    type: String,
    set: function (v) {
      return v.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Primer letra en mayuscula
      }).join(' ')
    }
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid format.'], // Validación de email
    lowercase: true
  },
  avatar: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  }
}, { timestamps: true, versionKey: false })

const User = mongoose.models.UserSchema || mongoose.model('User', UserSchema, 'users') //  la primera linea (mongoose.models.UserSchema) verifica que el modelo existe y no sea redefinido, en caso que no exista se crea el modelo

module.exports = User