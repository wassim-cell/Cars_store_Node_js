const mongo=require('mongoose')
const bcrypt=require('bcrypt')

url="mongodb://localhost:27017/blog1"

var userModel = mongo.Schema({
    name:String ,
    email:String ,
    password:String
})

var user = mongo.model('user',userModel)



exports.registerFunction=(name,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return user.findOne({email:email}).then((email)=>{
                if(email){
                    mongo.disconnect()
                    reject('email is already used')
                    
                }else {
                    
                    return bcrypt.hash(password,10)
                  
                }
                
            }).then((password)=>{
                let User = new user({
                    name:name ,
                    email:email ,
                    password:password 
             })
                 return User.save()
            }).then(user=>{
                mongo.disconnect()
                resolve(user)
                
            })
        }).catch((err)=>{
            mongo.disconnect()
            reject(err)
            
        })
    })
}

exports.loginFunction=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return user.findOne({email:email}).then(email=>{
                if(email){
                    
                    return  bcrypt.compare(password,email.password).then((password)=>{
                        
                        if(password){
                            console.log(password)
                            resolve(email._id)
                            mongo.disconnect()
                        }else {
                            mongo.disconnect()
                            reject("password is not correct")
                        }
                    })
                }else {
                    mongo.disconnect()
                    reject("email is not found")
                }
            })
        })
    })
}

exports.getUsersForAdmin=(()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return user.find({}).then((users)=>{
                mongo.disconnect()
                resolve(users)
            })
        }).catch((err)=>{
            reject(err)
        })
    })
})

exports.getAdminLogin=((email,password)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            console.log(email)
            if (email == "challoufwassim39@gmail.com")  {
                  if  (password == "Wass*53466390") {
                    mongo.disconnect()
                    resolve("Your are The admin")
                  } else {
                    mongo.disconnect()
                    reject("Your password is not correct !")
                  }        
                }else {
                    mongo.disconnect()
                    reject("Your email is not correct !")
                }
            }).catch((err)=>{
                reject(err)
            })
        })
    })
    
    exports.deleteUsers=(id)=>{
        return new Promise((resolve,reject)=>{
            mongo.connect(url).then(()=>{
                return user.deleteOne({_id:id}).then(()=>{
                    resolve(true)
                    mongo.disconnect()
                })
            }).catch((err)=>{
                reject(err)
                mongo.disconnect()
            })
        })
    }






