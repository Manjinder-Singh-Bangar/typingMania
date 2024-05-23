import { Router } from "express";
import { user, verifyingUser, userLogin } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(user)
router.route("/verify/:token").get(verifyingUser)
router.route("/login").get(userLogin)

export default router