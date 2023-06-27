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

async function getUserAuthenticated ( username, userpassword ) {
    try{
        const { password } = await userScehmaDb.findOne({userName:username},{password:1, _id:0})
        const hashedPassword = password
        const passwordAuthenticated = bcrypt.compareSync( userpassword, hashedPassword)
        if( passwordAuthenticated ){
            return { correctPassword: true, userExist : true }
        } else {
            return { correctPassword : false, userExist : true  }
        }
    }catch ( error ) {
        return { correctPassword : false, userExist: false, }
    }
}

module.exports = {
    getUserAuthenticated,
}