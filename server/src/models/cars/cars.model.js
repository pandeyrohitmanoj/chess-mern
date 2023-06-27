const carsDb = require('./cars.mongo')
const  fileType = import('file-type')

const { getImageLinksInFolder, postImageInGDriveFolder} = require("./getDriveImageLinks.js")

const itemPerPage = 8;


async function isFileValid(buffer) { 
  const fileBuffer =  buffer //req.file.buffer;
  const fileMime = fileType(fileBuffer);
  if (!fileMime || !fileMime.mime.startsWith('image/')) {
    return false;
  }
  return true
}

async function isFileInAppropriateSize(fileSize) {
  const maxFileSize = 5 * 1024 * 1024; // Maximum file size of 5MB
  
  // Inside the file upload endpoint
  if (fileSize > maxFileSize) { //if (req.file.size > maxFileSize) 
    return false
  }
  return true
}

async function getAllCarData(pageNo, type, cityName) {
    const skip = ( pageNo - 1 ) * itemPerPage
    try{
      let result, allFilter= {}

      if( cityName!=undefined){
        Object.assign(allFilter,{ cityName })
      }
      if( type != undefined && type!='All'){
        Object.assign(allFilter,{ type })
      }  
      result = await carsDb.find( allFilter).skip(skip).limit(itemPerPage)
      // console.log(allFilter)
      // result = await carsDb.find( ).skip(skip).limit(itemPerPage)
      
      // console.log(result)
      return result
    }catch(error){
      console.error(`you got an error in carModel: ${error}`)
    } 
    return []
}

async function postCarImage( file) {
 try{
  if(!isFileValid(file.buffer)){
    throw new Error(`You got an error File type is not valid`)
  }
  if(!isFileInAppropriateSize(file.size)){
    throw new Error(`File is bigger than allowed`)
  }
  const imageURI = await postImageInGDriveFolder(file)
  return await imageURI
 }catch(error){
  throw new Error(`You got an error while car.model while finding imageLinks:${error.message}`)
 }
}



// async function httpPostCarData(){
//   try{
//     const date ='2023-06-01,2023-12-31'
//     await carsDb.updateMany( { }, {$set:{ datesAvailability: date }},{upsert:false} )
//     return true
//   }catch(error) {
//     console.error(`You got error in cars.model: ${error.message}`)
//   }
//   return
// }

async function httpPostCarData( carData,file){
  try{
    const userName = carData.ownerName
    const response = await carsDb.findOne({ ownerName: userName })
    if(response != null ){
      return {ok:"user already exist"}
    }
    carData["imageURI"] = await postCarImage(file)
    const dbResponse = await carsDb.updateOne({},carData,{upsert:true})
    
    return await dbResponse.modifiedCount
  }catch(error) {
    console.error(`Ypu got error in cars.model: ${error.message}`)
  }
  return
}

/*
{"_id":{"$oid":"64690005bf321ae722717238"},
"make":"Hyundai",
"ownerName":"Felipe García",
"carPrice":{"$numberInt":"1250000"},
"pricePerHour":{"$numberInt":"250"},
"imageURI":"https://drive.google.com/file/d/16tdXjZ74PO0eQRF2q-38MXGKRBXpDPkc/view?usp=drivesdk",
"datesAvailability":"2023-06-01,2023-09-01",
"type":"Petrol",
"countryName":"Mexico",
"cityName":"Mexico City",
"__v":{"$numberInt":"0"}}
*/


async function getAllData() {
  const response = await carsDb.find({},{countryName:1, cityName:1,_id:0})  
  // console.log("your response is:",response)
  return response
}

async function postBookCarSoUpdateDates(imageURI,firstDate) {
  try{
    let end = new Date(firstDate)
    const newEndDate = new Date( end.getTime() + 3 * 30 * 24 * 60 * 60 * 1000)
    const endDate = newEndDate.getFullYear()+'-'+(newEndDate.getMonth()+1)+"-"+newEndDate.getDate()
    let newDatesAvailability = firstDate+","+endDate
    //console.log(newDatesAvailability)
    const response = await carsDb.updateOne({imageURI},{$set:{datesAvailability:newDatesAvailability}}, {upsert:true})
    //onsole.log(imageURI)
    return newDatesAvailability
  }catch(error) {
    throw new Error(`You got an error in ${error.message}`)
  }
}

// async function getAllCarsData() {
//   const response = await carsDb.find( {}, {_id:0,__v:0})
//   return await response
// }

module.exports = {
  getAllCarData,
  httpPostCarData,
  getAllData,
  postBookCarSoUpdateDates,

}