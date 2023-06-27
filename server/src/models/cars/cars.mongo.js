const mongoose = require('mongoose')

const carsScehma = new mongoose.Schema({
    make:{
        type: String,
        required: true,
    },
    ownerName:{
        type: String,
        required: true,
    },
    carPrice: {
        type: Number,
        required: true,
    },
    pricePerHour:{
        type: Number,
        required:true,
    },
    imageURI: {
        type: String,
        required: false,
        default:"",
    },
    datesAvailability:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    countryName:{
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true
    }
})

const carsDb = mongoose.model( 'carsdata', carsScehma)

module.exports = carsDb
    
