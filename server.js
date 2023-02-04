import dotenv from "dotenv"
import  express from "express";
import mongoose from "mongoose";
import { connectDB } from "./connection.js";
const app=express()
connectDB()

dotenv.config({path:"./config.env"})
const PORT =process.env.PORT

app.use(express.json())
// all router files
import auth from "./routes/auth.js"
app.use(auth)











app.listen(PORT,(req,res)=>{
    console.log(`server is running port number ${PORT}`)
})


