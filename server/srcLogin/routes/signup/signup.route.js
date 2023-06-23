const express = require('express')
const signupRouter = express.Router()

const {
    httpSaveUser,
} = require('./signup.controller')

signupRouter.post('/', httpSaveUser)

module.exports = { signupRouter, }