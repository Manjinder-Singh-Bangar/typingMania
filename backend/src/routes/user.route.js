import { Router } from "express";
import { user, verifyingUser, userLogin, userLogout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares.js/auth.middleware.js";
const router = Router()

router.route("/register").post(user)
router.route("/verify/:token").post(verifyingUser)
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJWT,userLogout)

export default router