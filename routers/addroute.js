
const bookController=require('../controllers/book')

const router=require('express').Router()
const gardauth=require('./gardauth')
const multer=require('multer')









router.get('/',gardauth.isauth,bookController.getaddbookcontroller)


router.post('/',multer({
storage:multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'assests/uploads')
  },
  filename:function(req,file,cb) {
    cb(null,Date.now() +' '+  file.originalname ) }
})
}).single('image'),
gardauth.isauth,bookController.postaddbookcontroller)




module.exports=router