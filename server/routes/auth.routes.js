import express from "express";
import { login, register } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
export default router;
/**
 *
 * login and register ku athorization use panna matom - authendication
 * web application features ah access pandra ellathukum Authorization that is verifyToken use pannuvom - ithu middleware
 * middleware pathi innumm understand pannikiten
 */
