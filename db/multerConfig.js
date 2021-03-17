
const multer = require('multer')
const Datauri = require('datauri')
const path = require('path')

const storage = multer.memoryStorage();

//const fileUpload = multer({ dest: 'uploads/' }).single('fileData');
const memoryUploads = multer({ storage }).single('fileData');

const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { memoryUploads , dataUri };
