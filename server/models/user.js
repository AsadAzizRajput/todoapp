const mongoose = require('mongoose');
const validator = require('validator');
var user = mongoose.model('user',{
    email:{
        type:String,
        required:true,
        trim:true,
        minLength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

module.exports={user};

