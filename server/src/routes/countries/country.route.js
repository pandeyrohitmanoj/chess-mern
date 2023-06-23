const countryRouter = require('express').Router()
const {
    httpGetAllCountry,
    httpPostCountry
} = require('./country.controller')

countryRouter.get( '/findCountry', httpGetAllCountry )

countryRouter.post( '/addCountry', httpPostCountry )

module.exports = {
    countryRouter,
}