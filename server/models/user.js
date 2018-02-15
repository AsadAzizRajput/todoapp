const mongoose = require('mongoose');
const validator = require('validator');
const {Schema} = mongoose;
const  jwt = require('jsonwebtoken');
const _ =  require('lodash');


var userSchema = new Schema({

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

userSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email'])
}
userSchema.methods.generateAuthToken=function()
{
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'pktm').toString();
    console.log(user);
    user.tokens.push({token,access});

    return user.save().then(()=>{
        return token;
    })
}

var user = mongoose.model('user',userSchema);



module.exports={user};

