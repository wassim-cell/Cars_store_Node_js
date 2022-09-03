const route=require("express").Router()
const homeController=require("../controllers/home.controller")
const gardAuth=require("../routes/gardauth")
const multer=require("multer")
const body=require("express").urlencoded()
const gardAdmin=require("../routes/gardAdmin")

route.get('/',homeController.getThreeProductsController)
route.get('/allProducts',gardAuth.isAuth,homeController.getAllProductsController)


route.get('/addProduct',gardAuth.isAuth,homeController.getAddProdcut)

route.post('/addProduct',multer({
    storage : multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'assets/uploads')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' +file.originalname )
        }
      })
}).single('image'),gardAuth.isAuth,homeController.AddProdcutFunctionController)

route.get('/myCars',gardAuth.isAuth,homeController.getMyCarsPage)
route.get('/myCars/delete/:id',homeController.deleteMyCarController)


route.get('/Details/:id',gardAuth.isAuth,homeController.getCarDetailPage)

route.post('/contact',body,homeController.postMessageController)

route.get('/myCars/update/:id',homeController.getUpdatePageController)
route.post('/myCars/update',multer({
  storage : multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'assets/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
      }
    })
}).single('image'),homeController.postUpdatePageController)




route.get('/carsTable',gardAdmin.isAdmin,homeController.getCarsForAdminController)



route.get('/contactsTable',gardAdmin.isAdmin,homeController.getContactsForAdminController)

route.get('/contactsTable/delete/:id',homeController.contactDeleteController)

route.get('/carsTable/delete/:id',gardAdmin.isAdmin,homeController.carsDeleteController)

route.post('/searchPage',body,gardAuth.isAuth,homeController.searchCarsController)

route.get('/rentePage/:id/:title/:img',gardAuth.isAuth,homeController.getRentePage)
route.post('/rentePage',body,homeController.postDataReservationController)


route.get('/reservationsTable',gardAdmin.isAdmin,homeController.getAllReservationsController)

route.get('/carDetail/delete/:id',homeController.deleteCarRenteController)


module.exports=route