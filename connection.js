import mongoose from "mongoose";

mongoose.set('strictQuery', true);
const DB="mongodb+srv://sachin:Hello@cluster0.uthhabo.mongodb.net/resume?retryWrites=true&w=majority"



export const connectDB =async ()=>{
   const {conn} =await mongoose.connect(DB);
   console.log("mogoDB coonected with  ")
}

// mongoose.set('strictQuery', true);
// mongoose.connect(process.env.DATABASE).then(()=>{
//     console.log("succesfully mongoDb ")
// }).catch((err)=>{
//     console.log(err)
// })



