const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/users')

router.get('/login',(req,res)=>{
    res.render("signin")
})

router.post('/login',(req,res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err) {
        if (err) { console.log(err) }
        else{
                passport.authenticate("local")(req,res,function(){
                res.redirect('/page')
            })
        }
    })
})

module.exports = router