const route=require("express").Router()
const authController=require("../controllers/auth.controller")
const body=require("express").urlencoded({extended:true})
const gardAuth=require("../routes/gardauth")
const gardAdmin=require("../routes/gardAdmin")


route.get('/register',gardAuth.verifAuth,authController.getRegisterPage)
route.post('/register',body,authController.authFonctionController)

route.get('/login',gardAuth.verifAuth,authController.getLoginPage)
route.post('/login',body,authController.loginFunctionController)

route.get('/logout',authController.logoutFunction)


route.get('/usersTable',gardAdmin.isAdmin,authController.getUsersForAdminController)
route.get('/usersTable/delete/:id',authController.usersDeleteController)





 
module.exports=route