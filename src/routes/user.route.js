import { Router } from "express";
import { user, verifyingUser, userLogin, userLogout } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(user)
router.route("/verify/:token").get(verifyingUser)
router.route("/login").get(userLogin)
router.route("/logout").post(userLogout)

export default router