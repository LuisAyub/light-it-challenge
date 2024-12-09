const sizeOf = require('image-size');
const multer = require('multer');
const imageMimeTypes = [
  'image/webp',
  'image/png',
  'image/jpeg',
];
const upload = multer({
  fileFilter:(req, file, next) => {
    if (!imageMimeTypes.includes(file.mimetype)){
      return next(new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed'))
    }
    next(null, true)
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  },
})

function validName(name){
    return !name || !/[^a-z]/i.test(name.replace(/\s/g, ""));
  }
  
  function validEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !email || emailRegex.test(email);
  }
  
  function validPhoneNumber(phoneNumber){
    const phoneNumberRegex = /^[0-9]*$/
    return !phoneNumber || phoneNumberRegex.test(phoneNumber);
  }
  
  
  function validPhoto(photo){
    if (!photo || !photo.buffer){
      return false;
    }
    const dimensions = sizeOf(photo.buffer);
    
    return (dimensions.width < 300 || dimensions.height < 300)
  }
  
  function validatePatient(req, res, next){  
    //Remove whitespaces from name
    const {name, email, phone} = req.body;
    const photoDocument = req.file;
    
    if (!validName(name)){
      res.send("name error").sendStatus(500)
    }
    if (!validEmail(email)){
      res.send("email error").sendStatus(500)
    }
    if (!validPhoneNumber(phone)){
      res.send("Phone number error").sendStatus(500)
    }
    if (!validPhoto(photoDocument)){
      res.send("Photo error").sendStatus(500)
    }
    next()
  }

module.exports = {upload, validatePatient}