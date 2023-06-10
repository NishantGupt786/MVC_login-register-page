const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose')
const router = express.Router()
const User = require('../models/users')

router.get('/page',(req,res)=>{
    if (req.isAuthenticated()) {
        res.render("final")
    }
    else{
        res.redirect('login')
    }
})

module.exports = router