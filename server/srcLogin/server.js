const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const { signupRouter, } = require('./routes/signup/signup.route')
const { loginRouter, } = require( './routes/login/login.route.js')

const { MONGO_URI } = require('./keys')
// const MONGO_URI = "mongodb+srv://rohitpandey20002017:Eaz9Sot1CzjVsqUN@cluster0.qk5uluw.mongodb.net/?retryWrites=true&w=majority"


app.use(cors())
app.use(express.json())

mongoose.connection.once( 'open', () => {
    console.log('mongodb connection is ready')
})
mongoose.connection.on( 'error', (err) => {
    console.error(err)
})


app.use( '/signup', signupRouter)
app.use( '/login', loginRouter )


async function startServer () {
    await mongoose.connect( MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    })
    
    app.listen( 8000, ( ) => {
        console.log('server has started')
    })
}

startServer()
