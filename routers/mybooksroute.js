const router=require('express').Router()
const bookController=require('../controllers/book')
const multer=require('multer')
const gardauth=require('./gardauth')


router.get('/',bookController.getmybookspage )
router.post('/delete/:id',bookController.deletebook )
//router.post('/update/:id',bookController.getmybookspage )

router.get('/update/:id',bookController.getmybooksupdatepage)

router.post('/update',multer({
storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'assests/uploads')
    },
    filename:function(req,file,cb) {
        cb(null,Date.now() +' '+  file.originalname ) }
})
}).single('image'),
gardauth.isauth,bookController.postupdatebookcontroller)










module.exports=router