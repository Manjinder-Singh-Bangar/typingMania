import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database connected successfully MongoDb Host:-${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Error happened while connecting to the database`+ error)
    }
}

export {dbConnect}