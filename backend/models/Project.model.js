import mongoose from "mongoose";
const projectSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    skillsRequired:{
        type:Array
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to Client (User)
        //assignedFreelancers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]  // Reference to Freelancers (Users)
    
}, {timeStamps:true})

const Project = mongoose.model('Project', projectSchema)
export default Project