const express = require("express");
const router = express.Router();

//ASSOCIATION LOGIQUE METIER AVEC LES DIFFERENTES ROUTES
const postsCtrl = require("../controllers/posts");

//IMPORTATION DES MIDDLEWARES AUTH
const auth = require("../middleware/auth");

//POSTS
router.get("/", auth, postsCtrl.getAllPosts);
router.post("/", auth, postsCtrl.createPost);
router.put("/:id", auth, postsCtrl.updatePost);
router.delete("/:id", auth, postsCtrl.deletePost);
//LIKES
router.get("/likes", auth, postsCtrl.getAllLikes);
router.get("/:id/likes", auth, postsCtrl.postLike);
//COMMENTS
router.get("/:id/comments", auth, postsCtrl.getComments);
router.post("/:id/comments", auth, postsCtrl.createComment);
router.put("/comments/:id", auth, postsCtrl.updateComment);
router.delete("/comments/:id", auth, postsCtrl.deleteComment);

module.exports = router;
