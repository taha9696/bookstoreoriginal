const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { resolve } = require('path')






var schemaauth = mongoose.Schema({
    name: String,
    email: String,
    password: String
})


var User = mongoose.model('user', schemaauth)
var url = 'mongodb://0.0.0.0:27017/library'

exports.registerfunctionmodel = (name, email, password) => {
    //test if email exists (true go to login) (false add this user to users collection)
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedtopology: true }).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                
                reject('email is used')
            } else {
                return bcrypt.hash(password, 10)
            }
        }).then((hPassword) => {
            let user = new User({
                name: name,
                email: email,
                password: hPassword
            })
            return user.save()
        }).then((user) => {
            mongoose.disconnect()
            resolve('registred !')
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })


}

exports.loginfunctionmodel = (email, password) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedtopology: true }).then(() => {
            return User.findOne({ email: email })

        }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        resolve(user._id)

                    } else {
                        reject("password invalid ")

                    }

                })
            } else {
                mongoose.disconnect
                reject("email invalid ")

            }
        }).catch(()=>{
            reject(err)
        })
    

    })


}