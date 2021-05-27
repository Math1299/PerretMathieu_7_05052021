//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const postsCtrl = require("../controllers/posts");

//importation des middlewares de vérification
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//POSTS
try {
    router.get("/", auth, postsCtrl.getAllPosts);
    router.post("/", auth, postsCtrl.createPost);
    // router.put("/:id", auth, postsCtrl.updatePost);
    // router.delete("/:id", auth, postsCtrl.deletePost);
    // //LIKES
    // router.get("/likes", auth, postsCtrl.getAllLikes);
    // router.get("/:id/likes", auth, postsCtrl.postLike);
    // //COMMENTS
    // router.get("/:id/comments", auth, postsCtrl.getComments);
    // router.post("/:id/comments", auth, postsCtrl.createComment);
    // router.put("/:id/comments", auth, postsCtrl.updateComment);
    // router.delete("/:id/comments", auth, postsCtrl.deleteComment);
} catch (error) {
    console.log(error);
}

module.exports = router;
