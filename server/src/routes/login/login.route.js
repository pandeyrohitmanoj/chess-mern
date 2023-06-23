const express = require('express')
const loginRouter = express.Router()

const {
    httpCheckCredentials,
    httpPostUpdateHistory,
    httpGetHistoryDataFromGmail,
} = require('./login.controller')

loginRouter.post('/', httpCheckCredentials )

loginRouter.post('/bookcar',httpPostUpdateHistory)

loginRouter.post( '/getHistory', httpGetHistoryDataFromGmail)

module.exports = {
    loginRouter,
}

