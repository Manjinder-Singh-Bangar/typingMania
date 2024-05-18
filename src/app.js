import express from "express";

const app = express()

app.use(express.json({limit:"16kb"}))

// routes

import userRoute from "./routes/user.route.js"



// declaration
app.use("/api/v1/users", userRoute)

export {app}