const cityRouter = require('express').Router()

const {
    httpGetCity,
    httpPostCity,
    httpSaveDb,
    httpGetAllData
} = require('./cities.controller')

cityRouter.get('/getAllCity', httpGetAllData)

cityRouter.post('/getCity', httpGetCity)

cityRouter.post( '/addCity', httpPostCity)

// cityRouter.post( '/savedb', httpSaveDb)

module.exports = {
    cityRouter,
}