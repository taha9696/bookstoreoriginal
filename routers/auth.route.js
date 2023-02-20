const route=require('express').Router()
const authcontroller=require('../controllers/auth.controller')
const body=require('express').urlencoded({extended:true})
const gardauth=require('./gardauth')





route.get('/register',gardauth.notauth,authcontroller.getregisterpage)
route.post('/register',body,authcontroller.postregisterdata)


route.get('/',gardauth.notauth,authcontroller.getloginpage)
route.post('/',body,authcontroller.postlogindata)


route.post('/logout',authcontroller.logoutfunction)

module.exports=route