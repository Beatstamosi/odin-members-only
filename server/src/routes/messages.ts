import { Router } from "express";
import { getAllMessages } from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/get-all", getAllMessages);

export default messagesRouter;
