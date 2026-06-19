import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import authRoutes from './routes/authRoute.js';
import historyRoute from './routes/history.js';
import uploadRoute from './routes/uploadfile.js';
import adminRoute from './routes/admin.js';
import quizRoute from './routes/quiz.js';


const app=express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api',historyRoute);
app.use('/api',uploadRoute);
app.use('/api/admin', adminRoute); 
app.use('/api', quizRoute);


app.listen(3000,()=>{
    console.log("server is running on port 3000");
    connectDB();
});

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected with database");
    }catch(err){
        console.log("Failed to connect with database",err);
    }
}

