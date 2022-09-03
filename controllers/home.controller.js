const homeModel=require("../models/home.model")

exports.getThreeProductsController=(req,res,next)=>{
    homeModel.getThreeProducts().then(Products=>{
        res.render("home",{Products:Products,verifUser:req.session.userId})
    })
}

exports.getAllProductsController=(req,res,next)=>{
    let id = req.session.userId 
   console.log(req.query)
    homeModel.getAllProducts(req.query).then(Products=>{
        homeModel.getCarId(id).then((verif)=>{
            console.log(verif)
                res.render("allProducts",{Products:Products,verifUser:req.session.userId,verif:verif})
        
        })
       
    })
}

exports.getAddProdcut=(req,res,next)=>{
    res.render("addProduct",{verifUser:req.session.userId})
}

exports.AddProdcutFunctionController=(req,res,next)=>{
    homeModel.postDataProdcut(req.body.title,req.body.price,req.body.author,req.body.rente,req.body.discription,req.file.filename,req.session.userId).then(()=>{
        res.redirect('/addProduct')
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getMyCarsPage=(req,res,next)=>{
    homeModel.getMyCars(req.session.userId).then((Cars)=>{
        res.render('myCars',{Cars:Cars,verifUser:req.session.userId})
    })
   
}

exports.deleteMyCarController=(req,res,next)=>{
    let id = req.params.id
    homeModel.deleteMyCar(id).then(()=>{
        res.redirect('/myCars')
    })
   
}

exports.getCarDetailPage=(req,res,next)=>{
    let id = req.params.id
    homeModel.getCar(id).then((Car)=>{
        homeModel.getCarRenteRenter(Car._id).then((verif)=>{
                homeModel.getCarRente(Car._id,req.session.userId).then((verifRenter)=>{
                     homeModel.getMyCarRente(Car._id,req.session.userId).then((verifMyRente)=>{
                            console.log(verifMyRente)      
                            res.render('carDetail',{verifUser:req.session.userId,Car:Car,verif:verif,verifRenter:verifRenter,verifMyRente:verifMyRente})
                        }) 
                })  
            })
    }).catch((err)=>{
        
        console.log("error")
    })
}

exports.postMessageController=(req,res,next)=>{
    homeModel.postMessage(req.body.name,req.body.email,req.body.subject,req.body.message).then(()=>{
        res.redirect('/contact')
    })
}

exports.getUpdatePageController=(req,res,next)=>{
    let id = req.params.id 
    homeModel.getUpdatePage(id).then((car)=>{
        res.render('updateCar',{verifUser:req.session.userId,car:car})
    }).catch((err)=>{
        console.log(err)
    })
}


exports.postUpdatePageController=(req,res,next)=>{
    if(req.file) {
    homeModel.postUpdatePage(req.body.idCar,req.body.title,req.body.price,req.body.rente,req.body.discription,req.file.filename).then((car)=>{
        res.redirect('/myCars')
    }).catch((err)=>{
        console.log(err)
    })
    }else {
        homeModel.postUpdatePage(req.body.idCar,req.body.title,req.body.price,req.body.rente,req.body.discription,req.body.oldImage).then((car)=>{
            res.redirect('/myCars')
        }).catch((err)=>{
            console.log(err)
        })    


    }
}

exports.getCarsForAdminController=(req,res,next)=>{
    homeModel.getCarsForAdmin().then(cars=>{
    res.render('Dashboard/carsTable',{cars:cars,verifAdmin:req.session.adminId})
    
    })
}

exports.getContactsForAdminController=(req,res,next)=>{
    homeModel.getContactsForAdmin().then(contacts=>{
    res.render('Dashboard/contactsTable',{contacts:contacts,verifAdmin:req.session.adminId})
    
    })
}

exports.contactDeleteController=(req,res,next)=>{
    let id = req.params.id
    homeModel.deleteContact(id).then((add)=>{
        console.log(add)
        res.redirect('/contactsTable')
    })
}

exports.carsDeleteController=(req,res,next)=>{
    let id = req.params.id
    homeModel.deleteCars(id).then((add)=>{
        console.log(add)
        res.redirect('/carsTable')
    })
}

exports.searchCarsController=(req,res,next)=>{
    console.log(req.body.title)
    homeModel.serachCars(req.body.title).then((cars)=>{
        console.log(cars)
        if (cars == '') {
            res.redirect('/errorNotFoundPage')
       
        } else {
             res.render('searchPage',{verifUser:req.session.userId,cars:cars})
        }
    })
}

exports.getRentePage=(req,res,next)=>{
    let carId = req.params.id
    let title = req.params.title
    let img = req.params.img
    res.render('rentePage',{verifUser:req.session.userId,carId:carId,title:title,img:img})
}

exports.postDataReservationController=(req,res,next)=>{
    homeModel.postDataReservation(req.body.carId,req.body.title,req.body.img,req.session.userId,req.body.firstName,req.body.lastName,req.body.gender,req.body.email,req.body.phone,req.body.pickUpDate,req.body.returnDate,req.body.returnLocation,req.body.renteDaysNumber).then((carId)=>{
       
        res.redirect('/allProducts')
    })
}

exports.getAllReservationsController=(req,res,next)=>{
    homeModel.getAllReservations().then((Reservations)=>{
        res.render('Dashboard/reservationsTable',{Reservations:Reservations,verifAdmin:req.session.adminId})
    }).catch((err)=>{
        console.log(err)
    })
}

exports.deleteCarRenteController=(req,res,next)=>{
    let id = req.params.id
    homeModel.deleteCarRente(id).then(()=>{
        res.redirect('/allProducts')
    })
}

