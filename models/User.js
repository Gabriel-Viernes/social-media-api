const { Schema, model } = require('mongoose')
const { thoughtSchema } = require('./Thought')

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(input) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(input)
            },
            message: emailResult => `${emailResult.value} is not a valid email!`
        }
    },
    thoughts: [thoughtSchema],
    friends: {
        type: String,
        default: 'none lol'
    }
})

const User = model('user', userSchema)
module.exports = User
        
