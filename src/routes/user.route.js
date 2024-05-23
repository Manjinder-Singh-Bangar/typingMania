import { Router } from "express";
import { user, verifyingUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(user)
router.route("/verify/:token").get(verifyingUser)

export default router