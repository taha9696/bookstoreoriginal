const authmodel=require('../models/auth.model')




exports.getregisterpage=(req,res,next)=>{
    res.render('register',{verifuser:req.session.userid,message:req.flash('error')[0]})
}


exports.postregisterdata=(req,res,next)=>{

    authmodel.registerfunctionmodel(req.body.name,req.body.email,req.body.password).then((user)=>{
        res.redirect('/')
    }).catch((err)=>{
        req.flash('error',err)
        res.redirect('/register')
        
    })
}





exports.getloginpage=(req,res,next)=>{
    res.render('login',{verifuser:req.session.userid,message:req.flash('error')[0]})
}

exports.postlogindata=(req,res,next)=>{

    authmodel.loginfunctionmodel(req.body.email,req.body.password).then((id)=>{
        req.session.userid=id
        res.redirect('/allbooks')

    }).catch((err)=>{
        req.flash('error',err)
        res.redirect('/')
    })
}



exports.logoutfunction=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })





    
}