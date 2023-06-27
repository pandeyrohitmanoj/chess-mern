const https = require('https')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const { signupRouter, } = require('./routes/signup/signup.route')
const { loginRouter, } = require( './routes/login/login.route.js')
const { carsRouter, } = require('./routes/cars/cars.route')
const { countryRouter, } = require('./routes/countries/country.route')
const { cityRouter, } = require('./routes/cities/cities.route')

const PORT = process.env.PORT || 8000

const staticPagePath = path.join(__dirname,'..','build')

const { MONGO_URI } = require('./keys')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(staticPagePath))

mongoose.connection.once( 'open', () => {
    console.log('mongodb connection is ready')
})
mongoose.connection.on( 'error', (err) => {
    console.error(err)
})

app.get('/',(req,res)=>{
    res.sendFile(staticPagePath)
})

app.use( '/api/signup', signupRouter)
app.use( '/api/login', loginRouter )
app.use( '/api/savecar', carsRouter)
app.use( '/api/country', countryRouter)
app.use( '/api/cities', cityRouter )



app.get('*',(req,res)=>{
    res.redirect('/')
})

async function startServer () {
    await mongoose.connect( MONGO_URI, {
        useNewUrlParser: true, 
    })
    
    app.listen( PORT, ( ) => {
        console.log('server has started')
    })
}

startServer()
