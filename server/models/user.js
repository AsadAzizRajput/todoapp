const mongoose = require('mongoose');
const validator = require('validator');
const {Schema} = mongoose;
const  jwt = require('jsonwebtoken');
const _ =  require('lodash');
const bcrypt = require('bcryptjs')


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

userSchema.statics.findByToken =function(token){
    var user = this;
    var decoded;
    try{
        console.log(token)
        decoded = jwt.verify(token,'pktm');
    } catch(err){

    }
    return user.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
}

userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password'))
    {
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            });
        });
    }else{

    }
})

var user = mongoose.model('user',userSchema);



module.exports={user};

