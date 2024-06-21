import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors())

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))


// routes

import userRoute from "./routes/user.route.js"


// declaration
app.use("/api/v1/users", userRoute)


export {app}