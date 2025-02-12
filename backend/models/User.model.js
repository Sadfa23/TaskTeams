import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    skills:{
        type:Array,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
}, {timestamps:true})

const User = mongoose.model('User', userSchema)

export default User