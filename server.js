const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser")
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const app = express()

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const pageRouter = require('./routes/page')
const logoutRouter = require('./routes/logout')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
    secret: "My secret",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/users');

passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/mvcDB');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use('/', indexRouter)
app.use('/', loginRouter)
app.use('/', pageRouter)
app.use('/', logoutRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log("Site is running on port 3000")
})