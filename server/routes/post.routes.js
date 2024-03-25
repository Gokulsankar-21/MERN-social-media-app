import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.controller.js";
const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts); // http://localhost:3000/post/
router.get("/:userId/posts", verifyToken, getUserPosts);

//  UPDATE
router.patch("/:postId/likes", verifyToken, likePost);

export default router;
