import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts); // http://localhost:3000/post/
router.get("/:userId/posts", verifyToken, getUserPosts);
router.post("/create", verifyToken, createPost);
//  UPDATE
router.patch("/:postId/likes", verifyToken, likePost);

export default router;
