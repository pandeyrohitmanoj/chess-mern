const mongoose = require('mongoose')

const countryNamesSchema = new mongoose.Schema({
    countryName:{
        type: Array,
        reuired: true,
    },
    index:{
        type: Number,
        required:true,
        default:0,
    }
})

const countriesDb = mongoose.model('countries', countryNamesSchema)

module.exports = countriesDb