const mongo=require('mongoose')
const bcrypt=require('bcrypt')

url="mongodb://localhost:27017/blog1"


var adminModel = mongo.Schema({
    name:String ,
    job:String ,
    email:String ,
    password:String
})

var admins = mongo.model('admin',adminModel)


exports.registerAdmin=(name,job,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return admins.findOne({email:email}).then((admin)=>{
                if(admin){
                    mongo.disconnect()
                    
                    resolve("email is already used !")
                } else {
                    return password
                   
                }
           }).then(password=> {
                  Admin = new admins({
                     name:name ,
                     job:job ,
                     email:email ,
                     password:password 
                  }) 
                  return Admin.save()
            }).then((admin)=>{
                resolve(admin._id)
                mongo.disconnect()
            })
            
        }).catch((err)=>{
            reject(err)
        })
    })
}


exports.loginForAdmin=((email,pass)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            
              return admins.findOne({email:email}).then(admin=>{
                  if  (admin) {
                    if (pass == admin.password) {
                        mongo.disconnect()
                        resolve(admin._id)
                     }else{
                            mongo.disconnect()
                            reject("Your password is not correct !")
                        }
           
                  } else {
                    mongo.disconnect()
                    reject("Your email is not correct !")
                  }        
               
            }).catch((err)=>{
                reject(err)
            })
        })
    })
})  

exports.getAllAdmins=(()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return admins.find({}).then((admins)=>{
                mongo.disconnect()
                resolve(admins)
            })
        }).catch((err)=>{
            reject(err)
        })
    })
})

exports.deleteAdmins=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return admins.deleteOne({_id:id}).then(()=>{
                resolve(true)
                mongo.disconnect()
            })
        }).catch((err)=>{
            reject(err)
            mongo.disconnect()
        })
    })
}


