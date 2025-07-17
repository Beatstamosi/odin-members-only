import { Router } from "express";
import activateMemberShip from "../controllers/membershipController.js";

const memberRouter = Router();

memberRouter.patch("/become-member", activateMemberShip);

export default memberRouter;
