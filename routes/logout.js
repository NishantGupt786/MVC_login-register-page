const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

module.exports = router