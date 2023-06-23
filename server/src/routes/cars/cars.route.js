const express = require('express')
const carsRouter = express.Router()
const multer = require('multer');
const fs = require('fs')

const {
    httpGetCars,
    httpPostCarsDb,
    httpGetAllData,
    httpPostUpdateDatesAvailable,
} = require('./cars.controller')


const storage = multer.diskStorage({
    destination: function ( req, file,cb){
        const uploadDir = 'uploads/'
        if(!fs.existsSync(uploadDir )){
            fs.mkdirSync(uploadDir)
        }
        cb(null,uploadDir)
    },
    filename: function (req, file, cb) {
        cb( null, file.fieldname )
    }
})

const upload = multer( { storage } )

carsRouter.post( '/getCars', httpGetCars)

carsRouter.post( '/db',httpGetAllData )

carsRouter.post( '/bookcar', httpPostUpdateDatesAvailable )


// carsRouter.post('/', upload.single('carImage') , httpPostCarsDb)

// carsRouter.post('/', httpPostCarsDb)


module.exports = {
    carsRouter,
}