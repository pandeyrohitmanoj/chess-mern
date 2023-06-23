const bcrypt = require('bcryptjs')

const userScehmaDb = require('../signup/signup.mongo')

// async function saveUserDb () {
//     try{
//         await userScehmaDb.insertOne({ userName : "test", password: "#92jdh4_;34", email: "test@gmail.com" })
//     }
//     catch (error) {
//         console.log(error)
//         return {error: error}
//     }
//     return {ok:true}    
// }

async function getUserAuthenticated ( email, userpassword ) {
    try{
        const { password, country, city, phone,  userName,} = await userScehmaDb.findOne({ email },{_id:0,})
        const hashedPassword = password
        const passwordAuthenticated = bcrypt.compareSync( userpassword, hashedPassword)
        
        if( passwordAuthenticated ){
            return { correctPassword: true, userExist : true, email, password, country, city, phone,  userName, }
        } else {
            return { correctPassword : false, userExist : true  }
        }
    }catch ( error ) {
        console.log(error)
        return { correctPassword : false, userExist: false, }
    }
}

async function postUserHistory(email, historyElement) {
    try{
        
        const { modifiedCount } = await userScehmaDb.updateOne({ email },{ $push:{ history: historyElement }}, {upsert:true } )
        return await modifiedCount
    } catch(error){
        console.log(`This error is in login.model ${error.message}`)
    }

}

async function getUserHistory( email ) {
    try{
        const reponse = await userScehmaDb.findOne( {email},{ _id:0, history:1})        
        return reponse
    }catch(error){
        console.log(`This error is in login.model and error is ${error.message}`)
    }
}

module.exports = {
    getUserAuthenticated,
    postUserHistory,
    getUserHistory,
}