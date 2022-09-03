



exports.isFirstAdmin=(req,res,next)=>{
        if(req.session.adminId == "62c2f9ae15b933b8124328f7") {     
        next()
        }else {
            res.redirect("/Dashboard")
        }
}

exports.isAdmin=(req,res,next)=>{
        if(req.session.adminId) {     
        next()
        }else {
            res.redirect("/adminLogin")
        }
}