import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database', error)
    }
}

export default connectDb