const mongo=require("mongoose")

url="mongodb://localhost:27017/blog1"

var productModel=mongo.Schema({
    title:String,
    price:Number,
    author:String ,
    discription:String ,
    image:String ,
    userId:String ,
    id:Number ,
    rente:String
})

var product = mongo.model('product',productModel)


var contactModel=mongo.Schema({
    name:String ,
    email:String ,
    subject:String ,
    message:String 
})

var contact = mongo.model('cantact',contactModel)


exports.getThreeProducts=()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{ 
            return product.find({}).limit(3)
        }).then(books=>{
            mongo.disconnect()
            
            resolve(books)
        }).catch(err=>reject(err))
    })
}

exports.getAllProducts=(query)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{ 
            let {page , limit } = query
            if (!page) {
                page=1
              }
            if (!limit){
                limit=9
            }
            return product.find({}).limit(limit).skip((page-1)*limit)
        }).then(books=>{
            mongo.disconnect()
            
            resolve(books)
        }).catch(err=>reject(err))
    })
}

exports.postDataProdcut=(title,price,author,rente,discription,filename,id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            Product = new product({
                title:title,
                price:price,
                author:author,
                discription:discription,
                image:filename ,
                userId:id ,
                rente:rente  
            })  
            return Product.save().then(()=>{
                mongo.disconnect()
                resolve("Data added !")
            })
        }).catch((err)=>{
            mongo.disconnect()
            reject("Failed !")
        })
    })
}

exports.getMyCars=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{ 
            console.log(id)
            return product.find({userId:id})
        }).then(books=>{
            mongo.disconnect()
            
            resolve(books)
        }).catch(err=>reject(err))
    })
}

exports.deleteMyCar=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{ 
            return product.deleteOne({_id:id})
        }).then(books=>{
            mongo.disconnect()
            
            resolve(true)
        }).catch(err=>reject(err))
    })
}

exports.getCar=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{ 
            return product.findById({_id:id})

        }).then(books=>{
            mongo.disconnect()
            
            resolve(books)
        }).catch(err=>reject(err))
    })
}

exports.postMessage=(name,email,subject,message)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            Message = new contact({
                name:name ,
                email:email ,
                subject:subject ,
                message:message
            })
            return Message.save().then(()=>{
                resolve("Message sent")
                mongo.disconnect()
            })
        }).catch((err)=>{
            reject(err)
        })
    })
}

exports.getUpdatePage=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{ 
            return product.findById({_id:id})
        }).then(books=>{
            mongo.disconnect()
            
            resolve(books)
        }).catch(err=>reject(err))
    })
}

exports.postUpdatePage=(id,title,price,rente,discription,file)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{ 
            return product.updateOne({_id:id},{title:title,price:price,rente:rente,discription:discription,image:file})
        }).then(books=>{
            mongo.disconnect()
            
            resolve(books)
        }).catch(err=>reject(err))
    })
}

exports.getCarsForAdmin=(()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return product.find({}).then((cars)=>{
                mongo.disconnect()
                resolve(cars)
            })
        }).catch((err)=>{
            reject(err)
        })
    })
})

exports.getContactsForAdmin=(()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return contact.find({}).then((contacts)=>{
                mongo.disconnect()
                resolve(contacts)
            })
        }).catch((err)=>{
            reject(err)
        })
    })
})


exports.deleteContact=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return contact.deleteOne({_id:id}).then(()=>{
                resolve(true)
                mongo.disconnect()
            })
        }).catch((err)=>{
            reject(err)
            mongo.disconnect()
        })
    })
}

exports.deleteCars=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return product.deleteOne({_id:id}).then(()=>{
                resolve(true)
                mongo.disconnect()
            })
        }).catch((err)=>{
            reject(err)
            mongo.disconnect()
        })
    })
}


exports.serachCars=(title)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            console.log(title)
            return product.find({title:title}).then((cars)=>{
                resolve(cars)
                mongo.disconnect()
            })
        }).catch((err)=>{
            reject(err)
            mongo.disconnect()
        })
    })
}

var reservationModel = mongo.Schema({
    renterId:String ,
    carId:String ,
    carTitle:String ,
    carImage:String ,
    firstName:String ,
    lastName:String ,
    gender:String ,
    email:String ,
    phone:Number ,
    pickUpDate:String ,
    returnDate:String ,
    returnLocation:String ,
    renteDaysNumber:Number
})

var reservation = mongo.model('reservation',reservationModel)

exports.postDataReservation=(carId,carTitle,carImage,renterId,firstName,lastName,gender,email,phone,pickUpDate,returnDate,returnLocation,renteDaysNumber)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            Reservation = new reservation({
                renterId:renterId ,
                carId:carId ,
                carTitle:carTitle ,
                carImage:carImage ,
                firstName:firstName ,
                lastName:lastName ,
                gender:gender ,
                email:email ,
                phone:phone ,
                pickUpDate:pickUpDate ,
                returnDate:returnDate ,
                returnLocation:returnLocation ,
                renteDaysNumber:renteDaysNumber
            })
            return Reservation.save().then(()=>{
                resolve(Reservation.carId)
                mongo.disconnect()
            })       
        }).catch((err)=>{
            reject(err)
            mongo.disconnect()
        })
    })
}

exports.getAllReservations=(()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return reservation.find({}).then((Reservations)=>{
                mongo.disconnect()
                resolve(Reservations)
            })
        }).catch((err)=>{
            reject(err)
        })
    })
})

exports.getCarRente=(carId,renterId)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return reservation.find({carId:carId,renterId:renterId}).then((verif)=>{
                mongo.disconnect()
                resolve(verif)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
        })
    })

}

exports.getCarRenteRenter=(carId,)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return reservation.find({carId:carId}).then((verif)=>{
                mongo.disconnect()
                resolve(verif)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
        })
    })

}


exports.deleteCarRente=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return reservation.deleteOne({carId:id}).then(()=>{
                resolve(true)
                mongo.disconnect()
            })
        }).catch((err)=>{
            reject(err)
            mongo.disconnect()
        })
    })
}


exports.getMyCarRente=(carId,userId)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return product.find({_id:carId,userId:userId}).then((verif)=>{
                mongo.disconnect()
                resolve(verif)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
        })
    })

}

exports.getCarId=(userId)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return reservation.find({renterId:userId}).then((verif)=>{
                mongo.disconnect()
                resolve(verif)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
        })
    })

}

exports.getCarModal=(carId)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return product.find({_id:carId}).then((verif)=>{
                mongo.disconnect()
                resolve(verif)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
        })
    })

}