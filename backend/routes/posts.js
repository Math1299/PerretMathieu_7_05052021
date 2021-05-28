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
    router.put("/:id/update", auth, postsCtrl.updatePost);
    router.delete("/:id/delete", auth, postsCtrl.deletePost);
    // //COMMENTS
    router.get("/comments", auth, postsCtrl.getAllComments); //VOIR SI PAS MIEUX /:id/comments pour getComments
    router.post("/:id/comments", auth, postsCtrl.createComment);
    // router.put("/:id/comments", auth, postsCtrl.updateComment);
    // router.delete("/:id/comments", auth, postsCtrl.deleteComment);
    // //LIKES
    // router.get("/likes", auth, postsCtrl.getAllLikes);
    // router.get("/:id/likes", auth, postsCtrl.postLike);
} catch (error) {
    console.log(error);
}

module.exports = router;
