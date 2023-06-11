const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const MVCuserSchema = new mongoose.Schema({
    email: String,
    password:String
})

MVCuserSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model('User',MVCuserSchema)