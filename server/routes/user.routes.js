import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/user.controller.js";
const router = express.Router();

// READ
router.get("/:userId", verifyToken, getUser); // get the individual user data
router.get("/:userId/friends", verifyToken, getUserFriends); //get the user's followers
// UPDATE
router.patch("/:userId/:friendId", verifyToken, addRemoveFriend); // single user -  add or remove

export default router;
