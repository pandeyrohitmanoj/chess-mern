const mongoose = require('mongoose')

const citiesSchema =  new mongoose.Schema({
    countryName:{
        type:String,
        required:true,
    }
    ,cityNames:{
        type: Array,
        required: true,
        default: []
    }
})

const citiesDb = mongoose.model( 'cities', citiesSchema )

module.exports = citiesDb