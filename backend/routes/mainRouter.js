import express from "express";
import userRouter from "./user.js"
import noteRouter from "./note.js"
const mainRouter = express.Router();

mainRouter.use("/user", userRouter)
mainRouter.use("/note", noteRouter)

export default mainRouter