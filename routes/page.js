const express = require('express')
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