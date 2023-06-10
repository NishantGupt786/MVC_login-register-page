const express = require('express')
const validator = require('validator');
const passport = require('passport')
const router = express.Router()
const User = require('../models/users')


router.get('/',(req,res)=>{
    res.render("register")
})


router.post('/', (req,res)=>{
    const username = req.body.email
    const usernum = req.body.mnum
    const userpass = req.body.password
    const confpass = req.body.confpassword
    if (validator.isEmail(username)===false) {
        res.send("invalid email")
    }
    else if (validator.isMobilePhone(usernum, 'en-IN') === false) {
        res.send("Enter valid Mobile number")
    }
    else if (validator.isStrongPassword(userpass) === false) {
        res.send("Password must have at least\n-8 characters\n-1 lowercase character\n-1 uppercase character\n-1 number\n-1 symbol")
    }
    else if (userpass !== confpass) {
        res.send("Passwords are not matching")
    }
    else{
        User.register(new User({username:username,mobilenum:usernum}), req.body.password, function(err, user) {
            if (err) {
                console.log(err)
                res.redirect('/')
            }
            else{
                passport.authenticate("local")(req,res,function(){
                    res.redirect('/page')
                })
            }
        });
        
    }
})

module.exports = router