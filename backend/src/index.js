import { app } from "./app.js";
import { dbConnect } from "./db/db.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})


dbConnect()
.then(()=>{
    app.on("error", (error)=>{
        console.log(`Error happened while starting the app ${error}`)
    })

    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`App is running on the port ${process.env.PORT}`)
    })
})
