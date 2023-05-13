import express from "express";
import {
    createPost,
    deletePost,
    dislikePost,
    getPost,
    getPosts,
    getTimeLinePosts,
    likePost,
    updatePost,
} from "../Controllers/PostController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticatedUser, createPost);
router.get("/:id", getPosts);
router.put("/:id", isAuthenticatedUser, updatePost);
router.delete("/:id", isAuthenticatedUser, deletePost);
router.put("/:id/like", isAuthenticatedUser, likePost);
router.put("/:id/dislike", isAuthenticatedUser, dislikePost);

router.get("/:id/timeline", getTimeLinePosts);
export default router;
