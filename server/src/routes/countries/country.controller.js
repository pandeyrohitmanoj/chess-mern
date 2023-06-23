const {
    postCountry,
    getAllCountry
} = require('../../models/countries/countries.model')

async function httpGetAllCountry( req, res ) {
    const response = await getAllCountry()
    // console.log(response)
    res.status(200).send(response)
    return
}

async function httpPostCountry( req, res ) {
    const {countryName,} = req.body
    const response = await postCountry(countryName)
    res.status(200).send(response)
    return
}

module.exports = {
    httpGetAllCountry,
    httpPostCountry
}