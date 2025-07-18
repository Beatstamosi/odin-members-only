import { Router } from "express";
import { getAllMessages, postMessage, deleteMessage } from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/get-all", getAllMessages);
messagesRouter.post("/post-message", postMessage);
messagesRouter.delete("/delete-message", deleteMessage);

export default messagesRouter;
