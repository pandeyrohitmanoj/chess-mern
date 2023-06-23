const countryDb = require('./countries.mongo')

async function getAllCountry() {
    try{        
        const response = await countryDb.find( {index:0}, { _id:0,countryName:1})
        if(response == null) {
            console.log("Db is empty")
            return ""
        }
        // console.log(response)
        return await response[0]["countryName"]
    }
    catch(error) {
        throw new Error(`You got an error in countries.model getAllCountry: ${error.message}`)
    }
}

async function postCountry( countryName ) {
    const response = await countryDb.updateOne({ index:0,}, { $addToSet:{ countryName }}, { upsert:true }) 
    const acknowledged = response.acknowledged
    const modifiedCount = response.modifiedCount
    return {acknowledged,modifiedCount}   
}

module.exports = {
    postCountry,
    getAllCountry
}