const express=require("express")

const app = express()
const path=require("path")
const homeRouter=require("./routes/home.route")
const authRouter=require('./routes/auth.route')
const adminRouter=require("./routes/admin.route")
const session = require('express-session')
const mongoStore = require('connect-mongodb-session')(session)
const flash = require("connect-flash")


var store = new mongoStore ({
    uri : "mongodb://localhost:27017/blog1" ,
    collection : "sessions"
})
app.use(session({
    secret : 'fdddfsds sdsf' ,
    store : store ,
    resave : true ,
    saveUninitialized : true
}))




app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')

app.use(flash())

app.use('/',adminRouter)
app.use('/',homeRouter)
app.use('/',authRouter)




app.get('/contact',(req,res,next)=>{
    res.render('contact',{verifUser:req.session.userId})
})



app.get('/errorNotFoundPage',(req,res,next)=>{
    res.render('errorNotFoundPage',{verifUser:req.session.userId})
})


app.get('/*',(req,res,next)=>{
    res.render('errorPageNotFound1',{verifUser:req.session.userId})
})






app.listen(5000,()=>{console.log("server run")})