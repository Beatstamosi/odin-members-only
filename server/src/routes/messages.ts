import { Router } from "express";
import { getAllMessages, postMessage } from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/get-all", getAllMessages);
messagesRouter.post("/post-message", postMessage);

export default messagesRouter;
