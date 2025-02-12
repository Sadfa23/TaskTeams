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
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/projects',projectRoutes)  // '/' for getAllProjects route

app.get('/',(req, res)=>{
    res.send('Hello from server')
})
app.listen(port, ()=>{
    console.log('Server running on port ', port)
})
