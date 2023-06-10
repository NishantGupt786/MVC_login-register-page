const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const MVCuserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobilenum:{
        type: String,
        required: true
    },
    password:{
        type:String
    }
})

MVCuserSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model('User',MVCuserSchema)