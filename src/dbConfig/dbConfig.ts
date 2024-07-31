import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("Connected to Mongodb Successfully!!")
        })

        connection.on("error", (error)=>{
            console.log("Mongodb connection error" + error)
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connect to db");
        console.log(error);
    }
}

