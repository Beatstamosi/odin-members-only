import { Router } from "express";
import activateAdmin from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.patch("/become-admin", activateAdmin);

export default adminRouter;
