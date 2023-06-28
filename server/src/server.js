const https = require('https')
const agent = new https.Agent( { rejectUnauthorized: false })
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const axios = require('axios')

const { signupRouter, } = require('./routes/signup/signup.route')
const { loginRouter, } = require( './routes/login/login.route.js')
const { carsRouter, } = require('./routes/cars/cars.route')
const { countryRouter, } = require('./routes/countries/country.route')
const { cityRouter, } = require('./routes/cities/cities.route')

const PORT = 8000

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



app.use( '/api/signup', signupRouter)
app.use( '/api/login', loginRouter )
app.use( '/api/savecar', carsRouter)
app.use( '/api/country', countryRouter)
app.use( '/api/cities', cityRouter )

app.post('/api/images', async (req, res) => {
    const { imageURI,} = req.body
//   console.log(imageURI)
    try {
  
      const driveUrl = imageURI;
  
      // Make a request to the Drive link
      const response = await axios.get(driveUrl, { responseType: 'arraybuffer' });

      const imageBuffer = response.data;
  
      // Set the appropriate headers for the image response
      res.setHeader('Content-Type', response.headers['content-type']);
      res.setHeader('Content-Length', response.headers['content-length']);
  
      // Send the image buffer as the response
      res.send(imageBuffer);
    } catch (error) {
      console.error('Error retrieving image:',error);
      res.sendStatus(500);
    }
  });

app.get('/',(req,res)=>{
    res.sendFile(staticPagePath)
})

app.get('*',(req,res)=>{
    console.log("backend is working")
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
