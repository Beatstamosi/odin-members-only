import { Router } from "express";
import { getAllMessages } from "../controllers/messagesControllers.js";

const messagesRouter = Router();

messagesRouter.get("/get-all", getAllMessages);

export default messagesRouter;
