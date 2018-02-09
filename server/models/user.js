var mongoose = require('mongoose');
var userModel = mongoose.model('userModel',{
    email:{
        type:String,
        required:true,
        trim:true,
        minLength:1
    }
})

module.exports={userModel};

