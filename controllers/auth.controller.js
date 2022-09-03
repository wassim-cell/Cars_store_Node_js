const authModel=require('../models/auth.model')



exports.getRegisterPage=(req,res,next)=>{
    res.render('register',{error:req.flash('error')})
}

exports.authFonctionController=(req,res,next)=>{
    authModel.registerFunction(req.body.name,req.body.email,req.body.password).then((user)=>{
        
        res.redirect('/login')
        
            
        
    }).catch((err)=>{
        req.flash('error',err)
        res.redirect('/register')
    })
}

exports.getLoginPage=(req,res,next)=>{
    res.render('login',{error:req.flash('error')})
}

exports.loginFunctionController=(req,res,next)=>{
    authModel.loginFunction(req.body.email,req.body.password).then((id)=>{
            
            req.session.userId = id 
            
            res.redirect('/')

    }).catch((err)=>{
        console.log(err)
        req.flash('error',err)
        res.redirect('/login')
    })
}

exports.logoutFunction=(req,res,next)=>{
    req.session.userId = null 
        res.redirect('/login')


}

exports.getUsersForAdminController=(req,res,next)=>{
    authModel.getUsersForAdmin().then(users=>{
    res.render('Dashboard/usersTable',{users:users,verifAdmin:req.session.adminId})
    
    })
}




exports.usersDeleteController=(req,res,next)=>{
    let id = req.params.id
    authModel.deleteUsers(id).then(()=>{
        res.redirect('/usersTable')
    })
}

