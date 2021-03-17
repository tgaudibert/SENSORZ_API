require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dbtu3yn20',
  api_key: '583631834577578',
  api_secret: 'QtbweJCEQGJiUGsE1lbGj5DA0mQ'
});


function uploadFile(file){
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
      resolve({url: result.url, id: result.public_id})
    }, {resource_type: "auto"})
  })
}



module.exports = {
  uploadFile
}
