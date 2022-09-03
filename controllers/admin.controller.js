const adminModel=require('../models/admin.model')

exports.adminRegisterController=(req,res,next)=>{
    adminModel.registerAdmin(req.body.name,req.body.job,req.body.email,req.body.password).then((id)=>{
        res.redirect('/adminLogin')
    }).catch((err)=>{
        console.log(err)
    })
}

exports.loginAdminController=(req,res,next)=>{
    adminModel.loginForAdmin(req.body.email,req.body.password).then((id)=>{
        req.session.adminId = id
       res.render('Dashboard/Dashboard',{verifAdmin:req.session.adminId})
    }).catch((err)=>{
        console.log(err)
        res.redirect('/Dashboard')
    })
}

exports.getAdminRegisterController=(req,res,next)=>{
     res.render('Dashboard/adminRegister')
}

exports.getAdminLoginController=(req,res,next)=>{
    res.render('Dashboard/adminLogin')
}

exports.getAllAdminsController=(req,res,next)=>{
    adminModel.getAllAdmins().then((admins)=>{
        res.render('Dashboard/adminsTable',{admins:admins,verifAdmin:req.session.adminId})
    }).catch((err)=>{
        console.log(err)
    })
}

exports.logout=(req,res,next)=>{
    req.session.adminId = null 
    res.redirect('/adminLogin')
}

exports.deleteAdminController=(req,res,next)=>{
    adminModel.deleteAdmins(req.params.id).then(()=>{
        res.redirect("/adminsTable")
    })
}

exports.getDashboardController=(req,res,next)=>{
        res.render("Dashboard/Dashboard",{verifAdmin:req.session.adminId})
}

exports.getCalondrieController=(req,res,next)=>{
    res.render("Dashboard/calondrie",{verifAdmin:req.session.adminId})
}


