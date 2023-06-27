const mongoose = require('mongoose')

const userDataSchema = mongoose.Schema( {
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    history:{
        type:Array,
        required:false,
    }
})

module.exports = mongoose.model('userData' ,userDataSchema)