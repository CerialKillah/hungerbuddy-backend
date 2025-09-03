var multer=require('multer')
const { uuid } = require('uuidv4');

 var serverpath=multer.diskStorage({
  destination:(req,file,path)=>{
      path(null,'public/images')
  },
  filename:(req,file,path)=>{
    console.log(file.originalname)
    var ext=file.originalname.substring(file.originalname.lastIndexOf(".")) 
    var myfile=uuid()+ext
    
     path(null,myfile)
  }
 
 })
 var upload=multer({storage:serverpath})

 module.exports=upload

/*  var multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // Fixed import
var path = require('path');

var serverpath = multer.diskStorage({
  destination: (req, file, cb) => { // Fixed parameter name
    console.log('[MULTER] Setting upload destination to public/images');
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => { // Fixed parameter name
    try {
      console.log('[MULTER] Processing file:', file.originalname);
      var ext = path.extname(file.originalname);
      var myfile = uuidv4() + ext;
      console.log('[MULTER] Generated filename:', myfile);
      cb(null, myfile);
    } catch (error) {
      console.error('[MULTER] Error generating filename:', error);
      cb(error);
    }
  }
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  console.log('[MULTER] Validating file type:', file.mimetype);
  
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    console.error('[MULTER] Invalid file type:', file.mimetype);
    cb(new Error('Only image files are allowed!'), false);
  }
};

var upload = multer({
  storage: serverpath,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;
 */