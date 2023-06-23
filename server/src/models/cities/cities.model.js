const citiesDb = require('./cities.mongo')

async function saveDb() {
    for(let i in country){
        const countryName = i
        let valueObject = country[i]
        let cityArray = Object.values(valueObject)
        //console.log(countryName, "  ", cityArray)
        await citiesDb.updateOne({ countryName }, {$set:{cityNames: cityArray}},{upsert:true})
    }
}

async function getAllData() {
    try{
        const response = await citiesDb.find( {}, {_id:0,__v:0 })
        return await response
    }catch( error ) {
        throw new Error(`error is in cities.model: ${error}`)
    }
}


async function getCitiesBasedOnCountry( countryName ) {
    try{
        const response = await citiesDb.find( {countryName}, {_id:0,__v:0 })
        return await response
    }catch(error) {
        throw new Error(`Error is in cities.model: ${error}`)
    }
}

async function addCity( countryName,cityName) {
    const response = await citiesDb.updateOne( { countryName },{ $addToSet: { cityNames: cityName} }, {upsert:true})
    const matchedCount = response
    return matchedCount
}

module.exports = {
    addCity,
    getCitiesBasedOnCountry,
    saveDb,
    getAllData
}
