const bookmodel=require('../models/book')


exports.allbookscontroller=(req,res,next)=>{

    bookmodel.getallbooks().then(books=>{
        res.render('allbooks',{books:books,verifuser:req.session.userid})
    })

}

exports.onebookcontroller=(req,res,next)=>{
    let id=req.params.id
    bookmodel.getonebook(id).then(books=>{
        res.render('details',{books:books,verifuser:req.session.userid})
    })

}


exports.getaddbookcontroller=(req,res,next)=>{
    res.render('addbooks',{verifuser:req.session.userid,smessage:req.flash('smessage')[0],emessage:req.flash('emessage')[0]})
}

exports.postaddbookcontroller=(req,res,next)=>{
    console.log(req.body)
    console.log(req.file.filename)
    bookmodel.postdatabookmodel(req.body.title,req.body.description,req.body.author,req.body.price,req.file.filename,req.session.userid).then((msg)=>{
       req.flash('smessage',msg)
       //console.log(msg)
       res.redirect('/addbooks')

    }).catch((err)=>{
        req.flash('emessage',err)
        res.redirect('/addbooks')
        //console.log(err)
    })
    
}


exports.getmybookspage=(req,res,next)=>{
    bookmodel.getmybooks(req.session.userid).then((books)=>{
        console.log(req.session.userid)

        console.log(books)
        res.render('mybooks',{verifuser:req.session.userid,books:books})
    })
    
}


exports.deletebook=(req,res,next)=>{
    let id=req.params.id
    
    bookmodel.deletebook(id).then((verif)=>{
        // console.log(verif)
        res.redirect('/mybooks')
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getmybooksupdatepage=(req,res,next)=>{
    let id=req.params.id
    bookmodel.getpageupdatebookmodel(id).then((book)=>{
        console.log(book)
        res.render('updatebook',{bookupdate:book,verifuser:req.session.userid,smessage:req.flash('smessage')[0],emessage:req.flash('emessage')[0]})
    })

    

}

exports.postupdatebookcontroller=(req,res,next)=>{
    if(req.file){
        bookmodel.postupdatebookmodel(req.body.bookid,req.body.title,req.body.description,req.body.author,req.body.price,req.file.filename,req.session.userid).then((msg)=>{
            req.flash('smessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        }).catch((err)=>{
            req.flash('emessage',err)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        })
    }else{
        bookmodel.postupdatebookmodel(req.body.bookid,req.body.title,req.body.description,req.body.author,req.body.price,req.body.oldimage,req.session.userid).then((msg)=>{
            req.flash('smessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        }).catch((err)=>{
            req.flash('emessage',err)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        })

    }



}