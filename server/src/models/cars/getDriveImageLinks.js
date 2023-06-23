const { google } = require('googleapis');
const uniqueFilename = require('unique-filename')
const fs = require('fs')

require('dotenv').config();



const auth = new google.auth.GoogleAuth({
  keyFile: 'pandeycred.json',
  scopes: 'https://www.googleapis.com/auth/drive',
});

const drive = google.drive({ version: 'v3', auth })

const folderId = '1RGEXHf5PmohFC4PoX2_miK-o4T8pcDHM'; 

const findGdriveList = async ( ) => {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
    fields: 'files(name, webViewLink)',
   });
   return response.data
}

async function getImageLinksInFolder() {
 const imageLinks = {} 

 try {
  const imageFiles = await findGdriveList()

  if (imageFiles.length) {
//    console.log('Image files in the folder:');

   imageFiles.forEach(file => {
    const temp = {}
    const name = new String(file.name).replace(/.jpg/,'')
    temp[name] = file.webViewLink
    Object.assign(imageLinks,imageLinks,temp)
    // console.log(`${file.name} (${file.webViewLink})`);
   });
  } else {
   console.log('No image files found in the folder.');
  }
//   console.log(imageLinks)
  return imageLinks
 } catch (error) {
  console.error('Error retrieving folder contents:', error);
 }
 return 
}

async function postImageInGDriveFolder(file) {
  try {
    const filename = String(uniqueFilename(""))+ "-"+ file.originalname
    
    const fileMetadata = {
      name: filename,
      parents: [folderId], 
    };

    
    const media = {
      mimeType: file.mimeType, 
      body: fs.createReadStream(file.path) ,
    };
    
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'webViewLink', 
    });

    const { webViewLink } = await response.data;
    return webViewLink
    return 
  } catch (error) {
    throw new Error(`Cannot upload image and error is in getDriveImageLinks: ${error}`)
  } 
}



module.exports = {
    getImageLinksInFolder,
    postImageInGDriveFolder,
}

