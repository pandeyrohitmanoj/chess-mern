const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcryptjs')

const {
    httpCheckCredentials,
} = require('./login.controller')

const userDb = require('../../models/signup/signup.mongo')

loginRouter.post('/', httpCheckCredentials )

module.exports = {
    loginRouter,
}

