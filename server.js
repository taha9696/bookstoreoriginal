const express= require('express')
const session = require('express-session')
const path=require('path')
const routerauth=require('./routers/auth.route')
const routerbook=require('./routers/book')
const routeraddbook=require('./routers/addroute')
const routermybook=require('./routers/mybooksroute')


const MongoDBStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')


const app=express()




app.use(express.static(path.join(__dirname,'/assests')))
app.set('view engine','ejs')
app.set('views','views')




var Store = new MongoDBStore({
    uri:'mongodb://0.0.0.0:27017/library',
    collection:'session'
})



app.use(flash())

app.use(session({
    secret:'this is my secret key azertyazerty',
    store:Store,
    resave:true,
    saveUninitialized:true
}))



app.use('/allbooks',routerbook)

app.use('/',routerauth)

app.use('/addbooks',routeraddbook)
app.use('/mybooks',routermybook)
//app.get('/addbooks',(req,res,next)=>{
  //  res.render('addbooks',{verifuser:req.session.userid})
//})


app.get('/mybooks',(req,res,next)=>{
     res.render('mybooks',{verifuser:req.session.userid}) 
    })










// app.get('/register',(req,res,next)=>{
//     res.render('register')
// })
// app.get('/details',(req,res,next)=>{
//     res.render('details')
// })






app.listen(3000,()=>console.log("server running in port 3000"))