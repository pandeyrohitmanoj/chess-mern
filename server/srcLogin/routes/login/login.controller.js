const passport = require('./googleAuth');
const express = require('express');
const app = express();
app.use(passport.initialize());
const {
    getUserAuthenticated,
} = require('../../models/login/login.model')


async function authenticatGoogleLogin() {

}


async function httpCheckCredentials ( req, res) {    
    try{
        const { username, userpassword } = req.body
        const authtenticationResult = await getUserAuthenticated( username, userpassword )
        const { correctPassword, userExist } = authtenticationResult
        res.send(`${correctPassword} ${userExist}`)
    }catch (error){
        res.send("User doesn't exist")
    }    
    return 
}

module.exports = {
    httpCheckCredentials,
}