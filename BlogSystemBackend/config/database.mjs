import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB= async()=>{
    try{
    await mongoose.connect(process.env.DataBase_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    });
    }catch(err){
        console.error(err);
    }
}
export default connectDB;