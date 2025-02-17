import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import connectDb from './utils/connectDb.js';
import authMiddleware from './middleware/authMiddleware.js';
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT
connectDb()
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's origin
    credentials: true, // Allow credentials
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/projects',authMiddleware,projectRoutes)  // '/' for getAllProjects route

app.get('/',(req, res)=>{
    res.send('Hello from server')
})
app.listen(port, ()=>{
    console.log('Server running on port ', port)
})
