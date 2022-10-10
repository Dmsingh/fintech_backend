import express from 'express';
import dotenv from 'dotenv'
import connect from './utils/db.js'
import userRouter from './routes/user.js'
import cors from 'cors'

const app = express();
dotenv.config();
app.use(cors());
//middleware
app.use(express.json());
app.use("/api/user",userRouter);


app.listen(process.env.PORT || 8000,()=>{
    connect();
    console.log("App is running.");
})
