const {
    getUserAuthenticated,
    postUserHistory,
    getUserHistory,
} = require('../../models/login/login.model')


async function httpCheckCredentials ( req, res) {    
    try{
        const { email, userpassword } = req.body
        const authtenticationResult = await getUserAuthenticated( email, userpassword )
        delete authtenticationResult.password
        // const { correctPassword, userExist, country, city, } = authtenticationResult
        res.send(authtenticationResult)
    }catch (error){
        res.send("User doesn't exist")
    }    
    return 
}

async function httpPostUpdateHistory(req, res) {
    const { email, datesAvailability, car,imageURI } = req.body    
    try{
        const history = {
            datesAvailability,
            car,
            imageURI,
        }
        const value = await postUserHistory(email,history)
        res.json( value )
    }catch(error){
        throw new Error(`the error is in login.controller ${error}`)
    }
}

async function httpGetHistoryDataFromGmail( req, res) {
    const {email} = req.body
    try{
        const response = await getUserHistory(email)
        res.send(response)
    }
    catch( error ) {
    console.log(`THis error caused in login.controller ${error.message}`)
    }
}

module.exports = {
    httpCheckCredentials,
    httpPostUpdateHistory,
    httpGetHistoryDataFromGmail,
}


