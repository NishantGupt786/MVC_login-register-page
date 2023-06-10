const express = require('express')
const validator = require('validator');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose')
const router = express.Router()
const User = require('../models/users')


router.get('/',(req,res)=>{
    res.render("register")
})


router.post('/', (req,res)=>{
    const username = req.body.name
    const usermail = req.body.email
    const usernum = req.body.mnum
    const userpass = req.body.password
    const confpass = req.body.confpassword
    if (validator.isAscii(username)===false || username.length<8) {
        res.send("Name should have viable characters and should be a minimum of 8 characters")
    }
    else if (validator.isEmail(usermail)===false) {
        res.send("invalid email")
    }
    else if (validator.isMobilePhone(usernum, 'en-IN') === false) {
        res.send("Enter valid Mobile number")
    }
    else if (validator.isStrongPassword(userpass) === false) {
        res.send("Password must have at least\n-8 characters\n-1 lowercase character\n-1 uppercase character\n-1 number\n-1 symbol")
    }
    else if (userpass !== confpass) {
        res.send("Paswwords are not matching")
    }
    else{
        User.register(new User({username:username, email: usermail, mobilenum: usernum}), userpass, function(err, user) {
            if (err) {
                console.log(err)
                res.redirect('/')
            }
            else{
                const authenticate = User.authenticate();
                authenticate(usermail, userpass, function(err, result) {
                    if (err) {res.send(err)}
                    else{res.redirect("page")}
                });
            }
        });
        
    }
})

module.exports = router