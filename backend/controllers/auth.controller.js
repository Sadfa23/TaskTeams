import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const signup = async (req, res) => {
    try {
        const {name, email, password, skills, role}=req.body;
        console.log(req.body)
        if(!name || !email || !password) return res.status(400).json({message:'All fields are required'});

        //validate email using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email format"});
        }
        const isExisting = await User.findOne({email});
        if(isExisting) {
            return res.status(400).json({success:false, message:'Email already exists'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password:hashedPassword,
            skills,
            role
        });

        user.save()
        console.log('User signed up successfully')
        res.status(201).json({success:true, message:'User created successfully'})
    } catch (error) {
        console.log('Error in signup', error);
        res.status(500).json({success:false, message:'Error in signing up, internal server error'})
    }
}

const generateToken = ({userId}) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'15d'})
    return token
}
const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'15d'});
    res.cookie('auth-token',token,{
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure: process.env.JWT_SECRET !== 'development'
    });

    return token
}
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({success:false, message:'All fields are required'})

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success:false, message:'Email does not exist'})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) return res.status(400).json({success:false, message:'Invalid credentials'});

        const token = generateTokenAndSetCookie(user._id, res)
        console.log('This is login token',token)

        const options = {
            expiresIn:Date.now() + 2*24*60*60*1000,
            httpOnly:true
        }

        res.status(200).cookie('LOGIN-token', token, options).json({
            success:true,
            token,
            message:'Logged in successfully'
        })

    } catch (error) {
        console.log('Error in login', error)
    }
}

export const getUserProfile = async (req, res) => {
    try {
        //const token = req.cookie['LOGIN-token'];
        //console.log('Token from getUserProfile', token)
        
        const userId = req.user._id;

        console.log('User id', userId)
        const user = await User.findById(userId).select('-password');

        if(!user) {
            return res.status(404).json({success:false, message:'User not found'})
        }
        res.status(200).json({success:true, user})
    } catch (error) {
        console.log('Error in profile controller:',error)
        res.status(500).json({success:true, message:'Internal server error'})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if(!users) {
            return res.status(404).json({success:false, message:'Not found'})
        }
        res.status(200).json({success:true, users})
    } catch (error) {
        console.log('Error getting all users', error)
    }
}