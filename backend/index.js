import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import mainRouter from "./routes/mainRouter.js"


dotenv.config();


await mongoose.connect(process.env.URL).then(() => {
    console.log("Database connection successful ");
})

const app = express();
const port = 3000;
app.use(cors())
app.use(bodyParser.json())

app.use("/api/v1", mainRouter)

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
})