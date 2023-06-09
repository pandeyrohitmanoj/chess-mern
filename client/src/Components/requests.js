import axios from 'axios'
 const domain = "https://chess-mern-uqn4.vercel.app/api"
 //https://chess-mern-k3mt7bn2e-pandeyrohitmanoj.vercel.app
// const domain = 'https://car-rental-cflmifmq6-pandeyrohitmanoj.vercel.app/api'
// const domain = "https://localhost:8000/api"

async function getCarsData(pageNo,type,cityName) {

    let body = {}
    if( cityName!=undefined){
        Object.assign(body,{ cityName })        
    }
    // if( type != undefined){
    //     Object.assign(body,{ type })    
    // } 
    if( pageNo != undefined){
        Object.assign(body,{ pageNo })    
    } 
    try{
        const link = `${domain}/savecar/getCars`
        const response = await axios.post( link, body)
        return await response
    } catch(error) {
        throw new Error(`No Network: ${error.message}`)
    }
}

async function getAllCountryAndCitiesName() {
    const link = `${domain}/cities/getAllCity`
    const response = await axios.get( link ).then( response => response.data)
    return response
}

async function getAllCityNames(country) {
    const link = `${domain}/cities/getCity`
    const response =  await axios.post( link, {countryName:country}).then( response => response.data)
    // console.log(response)
    return response
}

async function getAllCountryName(){
    const response = await axios.get(`${domain}/country/findCountry`).then( response => response.data)
    return response
}

async function postProfileForSignUp(userName, email, password, country, city, phone, ){
    const response = await axios.post(`${domain}/signup`,{ userName, email, password, country, city, phone, }).then( response => response.data)
    return response
}

async function getAuthenticateProfile( email, password,){
    //console.log(domain)
    const response = await axios.post(`${domain}/login`,{  email, userpassword:password,}).then( response => response.data)
    return response
}

async function postBookCar( imageURI, dates ){
    const response = await axios.post( `${domain}/savecar/bookcar`, { imageURI, dates }).then( response => response.data)
    return response
}

async function postHistory(email,  imageURI, car , datesAvailability){
    const response = await axios.post( `${domain}/login/bookcar`, { email,  imageURI, car , datesAvailability  }).then( response => response.data)
    return response
}

async function getHistoryData( email ){
    const response = await axios.post( `${domain}/login/getHistory`,{ email }).then( response => (response.data))
    return response
}

async function postfindImageData(driveurl) {
    const response = await axios.post( `${domain}/images`, { imageURI:driveurl } ).then( res => { 
        if(!res.ok) {
            throw new Error('Image Request failed')
        }
        return res.blob()
     } )
     return response
}

async function axiosgetImage( imageURI){
    const response = await axios.get( imageURI, {
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
      }, ).then( response => response.data )

      return response
}

export {
    getCarsData,
    getAllCountryAndCitiesName,
    getAllCityNames,
    getAllCountryName,
    postProfileForSignUp,
    getAuthenticateProfile,
    postBookCar,
    postHistory,
    getHistoryData,
    postfindImageData,
    axiosgetImage,
}