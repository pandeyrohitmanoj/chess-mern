var bcrypt = require('bcryptjs');

const { salt_number} = require('../../keys')

const salt = bcrypt.genSaltSync( salt_number )

const {
    saveUser,
} = require('../../models/signup/signup.model')

async function httpSaveUser ( req, res) {
    const { userName, email, password, country, city, phone, } = req.body

    if(userName=="" || email=="" || password== ""||country=="" || city=="" || String(phone).length==0) {
        res.status(200).json({ok:false})
        return
    }

    const hashPassword = bcrypt.hashSync( password, salt )
    // console.log(hashPassword)
    const response = await saveUser( userName, email, hashPassword, country, city, phone,  )
    res.status(200).json(response)
    return 
}

module.exports = {
    httpSaveUser
}