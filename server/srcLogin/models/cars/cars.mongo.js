const mongoose = require('mongoose')

const carsScehma = new mongoose.Schema({
    make:{
        type: String,
        required: true,
    },
    ownerName:{
        type: String,
        require: true,
    },
    pricePerHour:{
        type: Number,
        required:true,
    },
    imageURI: {
        type: String,
        required: true,
    },
    datesAvailability:{
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true
    }
})

const countryNamesSchema = new mongoose.Schema({
    countries:{
        type: Array,
        reuired: true,
    }
})

const citiesSchema =  new mongoose.Schema({
    country:{
        city:{
            type: Array,
            required: true,
            default: []
        }
    }
})

const carsDb = mongoose.model( 'cars', carsScehma)

const countriesDb = mongoose.model( 'countryNames', countryNamesSchema)

const citesDb = mongoose.model( 'cities', citiesSchema)

module.exports = {
    carsDb,
    countriesDb,
    citesDb
}
