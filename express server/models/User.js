const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
        default:0
    },
    verified:{
        type:Boolean,
        required:false,
    },
    verifiedAt:{
        type:Date,
        required:false,
    },
});
module.exports = mongoose.model('User',userSchema);