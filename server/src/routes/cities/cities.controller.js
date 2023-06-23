const {
    addCity,
    getCitiesBasedOnCountry,
    saveDb,
    getAllData,
} = require('../../models/cities/cities.model')

async function httpGetCity( req, res ) {
    const {countryName} = req.body
    try{
        const response = await getCitiesBasedOnCountry(countryName)
        // console.log(response)
        res.status(200).json(response)
        return
    }catch(error){
        throw new Error(`You got erron in cities.controller: ${error.message}`)
    }
}

async function httpPostCity( req,res ) {
    const { countryName,cityName } = req.body
    const response = await addCity(countryName,cityName)
    //console.log(response)
    res.json(response)
}

async function httpSaveDb(req,res){
    await saveDb()
    res.status(200).send("done")
}

async function httpGetAllData( req, res ){
    const response = await getAllData()
    res.send(response)
}


module.exports = {
    httpGetCity,
    httpPostCity,
    httpSaveDb,
    httpGetAllData,
}