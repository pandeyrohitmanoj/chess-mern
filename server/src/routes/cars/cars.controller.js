const express = require('express')
const Joi = require('joi')
const { getAllCarData, httpPostCarData,getAllData,postBookCarSoUpdateDates } = require('../../models/cars/cars.model')

async function httpGetCars( req, res) {
    try{
        const {pageNo,type,cityName} = req.body
        const result =await getAllCarData(pageNo,type,cityName)
        
        res.status(200).send(result)

    }
    catch (error) {
        res.send(`error is in the controller is ${error} `)
    }
}

async function httpPostCarsDb(req,res) {  
    const {
            make,
            ownerName,
            carPrice,
            pricePerHour,
            datesAvailable,
            type,
            country,
            cityName,
          } = req.body
    try {
        const data = {
            make,
            ownerName,
            carPrice,
            pricePerHour,
            datesAvailable,
            type,
            country,
            cityName,
        }
        const file = req.file

        const response = await httpPostCarData(data,file)
        
        res.status(200).send(response)
        // console.log(response)
        // await httpPostCarImage(file)
        // console.log(file)
    }catch(error) {
        console.error( `Error in controller: ${error.message}`)
    }
    return
}

// async function httpPostCarsDb(req,res) {  

//     try{    
//         const response = await httpPostCarData()        
//         res.status(200).send(response)
//     }catch(error) {
//         console.error( `Error in controller: ${error.message}`)
//     }
//     return
//     }
    

async function httpGetAllData(req,res) {
    const response = await getAllData()
    // console.log("your output is:", response)
    res.status(200).send(response)
}

async function httpPostUpdateDatesAvailable( req, res ) {
    const {dates,imageURI} = req.body
    let end = dates.split(",")[1]
    // console.log(end)
    end = new Date(end)
    const newFirstDate = new Date( end.getTime() + 60*60*24*1000*2)
    console.log(end, newFirstDate)
    const firstDate = newFirstDate.getFullYear()+'-'+(newFirstDate.getMonth()+1)+"-"+newFirstDate.getDate()
    try{ 
        const response = await postBookCarSoUpdateDates(imageURI,firstDate)
        res.send(response)

    }catch(error){
        throw new Error(`You got error in cars.controller ${error.message}`)
    }

}

module.exports = {
    httpGetCars,
    httpPostCarsDb,
    httpGetAllData,
    httpPostUpdateDatesAvailable
}