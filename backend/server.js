import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import authRoutes from './routes/authRoute.js';
import historyRoute from './routes/history.js';
import uploadRoute from './routes/uploadfile.js';
import adminRoute from './routes/admin.js';
import quizRoute from './routes/quiz.js';


const PORT=process.env.PORT ||5000;

const app=express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://summify-frontend.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS: " + origin));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api',historyRoute);
app.use('/api',uploadRoute);
app.use('/api/admin', adminRoute); 
app.use('/api', quizRoute);



// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`);
//     connectDB();
// });

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected with database");
    }catch(err){
        console.log("Failed to connect with database",err);
    }
}
connectDB();

export default app;

