const route=require("express").Router()
const adminController=require("../controllers/admin.controller")
const body=require("express").urlencoded({extended:true})
const gardAdmin=require("../routes/gardAdmin")

route.get('/adminRegister',gardAdmin.isFirstAdmin,adminController.getAdminRegisterController)
route.post('/adminRegister',body,adminController.adminRegisterController)

route.get('/adminLogin',adminController.getAdminLoginController)
route.post('/adminLogin',body,adminController.loginAdminController)



route.get('/adminsTable',gardAdmin.isFirstAdmin,adminController.getAllAdminsController)
route.get('/adminsTable/delete/:id',gardAdmin.isFirstAdmin,adminController.deleteAdminController)

route.get('/adminLogout',adminController.logout)

route.get('/Dashboard',gardAdmin.isAdmin,adminController.getDashboardController)
route.get('/calondrie',gardAdmin.isAdmin,adminController.getCalondrieController)





module.exports=route