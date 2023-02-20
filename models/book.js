const mongoose=require('mongoose')




var schemabook=mongoose.Schema({
    title:String,
    description:String,
    author:String,
    price:Number,
    image:String,
    userid:String
})



var bookk=mongoose.model('book',schemabook)
var url='mongodb://0.0.0.0:27017/library'




exports.getallbooks=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedtopology:true}).then(()=>{
            return bookk.find({})

        }).then(books=>{
            mongoose.disconnect()
            resolve(books)
        }).catch(err=>reject(err))
    })

}

exports.getonebook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedtopology:true}).then(()=>{
            return bookk.findById(id)

        }).then(books=>{
            mongoose.disconnect()
            resolve(books)
        }).catch(err=>reject(err))
    })

}

exports.postdatabookmodel=(title,description,author,price,image,userid)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedtopology:true}).then(()=>{
            let book=new bookk({
                title:title,
                description:description,
                author:author,
                price:price,
                image:image,
                userid:userid

            })
            return book.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve('added')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}









exports.getmybooks=(userid)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedtopology:true}).then(()=>{
            return bookk.find({userid:userid})

        }).then(books=>{
            mongoose.disconnect()
            resolve(books)
        }).catch(err=>reject(err))
    })

}




exports.deletebook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedtopology:true}).then(()=>{
            return bookk.deleteOne({_id:id})

        }).then(books=>{
            mongoose.disconnect()
            resolve(true)
        }).catch(err=>reject(err))
    })

}


exports.getpageupdatebookmodel=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedtopology:true}).then(()=>{
            return bookk.findById(id)

        }).then(books=>{
            mongoose.disconnect()
            resolve(books)
        }).catch(err=>reject(err))
    })

}


exports.postupdatebookmodel=(bookid,title,description,author,price,filename,userid)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedtopology:true}).then(()=>{
            
            return bookk.updateOne({_id:bookid},{title:title,description:description,author:author,price:price,image:filename,userid:userid})


        }).then(()=>{
            mongoose.disconnect()
            resolve('updated !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })

}
