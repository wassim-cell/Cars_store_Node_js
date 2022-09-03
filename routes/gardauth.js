


exports.isAuth=(req,res,next)=>{
    if(req.session.userId){
        next()
    }else {
        res.redirect('/adminlogin')
    }
}

exports.verifAuth=(req,res,next)=>{
    if(req.session.userId){
        res.redirect('/')
    }else {
       next()
    }
}