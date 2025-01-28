import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/handleAuth.js";
import { createUser, loginUser, getAllUsers } from "../controller/userController.js";

const router = express.Router();

router.route("/").get(authenticate, authorizeAdmin, getAllUsers);
router.route("/register").post(createUser);
router.route("/login").post(loginUser);

export default router;
