import { Router } from "express";
import { user } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(user)


export default router