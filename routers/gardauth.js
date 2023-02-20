exports.isauth=(req,res,next)=>{
    if(req.session.userid){
        next()

    }else{
        res.redirect('/')
    }
}


exports.notauth=(req,res,next)=>{
    if(req.session.userid){
        res.redirect('/allbooks') 

    }else{
        
        next()
    }
}