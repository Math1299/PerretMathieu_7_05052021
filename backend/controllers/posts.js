const jwt = require("jsonwebtoken");
const connectDb = require("../connectDb");

// const PostsModels = require("../models/Post");
// let postsModels = new PostsModels();

//********************************************POSTS******************************************************************* */

//middleware pour récupérer tous les posts des utilisateurs

exports.getAllPosts = (req, res, next) => {
    const userId = req.params.id;
    const sqlGetAllPosts =
        "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(DATE(posts.date), '%d/%m/%Y') AS date, TIME(posts.date) AS time, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
    connectDb.query(sqlGetAllPosts, [userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length === 0) {
            return res.status(400).json({ message: `Il n'y a aucun post pour le moment` });
        }
        res.status(200).json(result);
    });
};

//middleware pour créer un POST

exports.createPost = (req, res, next) => {
    const userId = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    let sqlCreatePost;
    let sqlInserts;

    sqlCreatePost = "INSERT INTO posts VALUES(NULL, ?, ?, ?, NOW(), 0)";
    sqlInserts = [userId, title, content];
    connectDb.query(sqlCreatePost, sqlInserts, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.status(201).json({ message: "Nouveau Post crée" });
    });
    console.log(sqlInserts);
};

//middleware pour modifier un POST

exports.updatePost = (req, res, next) => {
    const userId = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    // const id = req.params.id;
    console.log(userId);

    let sqlUpdatePost = "UPDATE posts SET title = ?, content = ? WHERE  userId = ?";
    let sqlInserts = [title, content, userId];
    connectDb.query(sqlUpdatePost, sqlInserts, function (err, result) {
        if (err) {
            return res.status(501).json(err.message);
        } else {
            return res.status(200).json({ message: "Post mis à jour" });
        }
    });
};

//middleware pour supprimer un POST

exports.deletePost = (req, res, next) => {
    const userId = req.params.id;
    const sqlDeletePost = "DELETE FROM posts WHERE userId = ?";
    const sqlInserts = [userId];
    connectDb.query(sqlDeletePost, sqlInserts, function (err, result) {
        if (err) {
            return res.status(501).json(err.message);
        } else {
            return res.status(200).json({ message: "Post supprimé" });
        }
    });
};

//********************************************COMMENTS******************************************************************* */

//middleware pour récupérer tous les commentaires

exports.getAllComments = (req, res, next) => {
    const userId = req.params.id;
    let sqlGetAllComments =
        "SELECT comments.comContent, DATE_FORMAT(comments.date, '%d/%m/%Y à %H:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
    connectDb.query(sqlGetAllComments, [userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length === 0) {
            return res.status(400).json({ message: `Il n'y a aucun commentaire pour le moment` });
        }
        res.status(200).json(result);
    });
};

//middleware pour créer un commentaire

exports.createComment = (req, res, next) => {
    let postId = req.params.id;
    let userId = req.body.userId;
    let content = req.body.comContent;

    let sqlCreateComments;
    let sqlInserts;

    sqlCreateComments = "INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?)";
    sqlInserts = [userId, postId, content];
    connectDb.query(sqlCreateComments, sqlInserts, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.status(201).json({ message: "Nouveau Post crée" });
    });
    console.log(sqlInserts);
};

//******************COMMENT*****************************

// exports.createComment = (req, res, next) => {
//     let postId = req.params.id;
//     let userId = req.body.userId;
//     let content = req.body.content;
//     let sqlInserts = [userId, postId, content];
//     postsModels.createComment(sqlInserts).then((response) => {
//         res.status(201).json(JSON.stringify(response));
//     });
// };

// exports.updateComment = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decodedToken.userId;
//     let content = req.body.content;
//     let commentId = req.params.id;
//     let sqlInserts1 = [commentId];
//     let sqlInserts2 = [content, commentId, userId];
//     postsModels
//         .updatePost(sqlInserts1, sqlInserts2)
//         .then((response) => {
//             res.status(201).json(JSON.stringify(response));
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json(JSON.stringify(error));
//         });
// };
// exports.deleteComment = (req, res, next) => {
//     let commentId = req.params.id;
//     let sqlInserts = [commentId];
//     postsModels.deleteComment(sqlInserts).then((response) => {
//         res.status(200).json(JSON.stringify(response));
//     });
// };
// exports.deleteComment = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decodedToken.userId;
//     let commentId = req.params.id;
//     let sqlInserts1 = [commentId];
//     let sqlInserts2 = [commentId, userId];
//     postsModels
//         .deletePost(sqlInserts1, sqlInserts2)
//         .then((response) => {
//             res.status(200).json(JSON.stringify(response));
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json(JSON.stringify(error));
//         });
// };

// exports.getComments = (req, res, next) => {
//     let postId = req.params.id;
//     let sqlInserts = [postId];
//     postsModels.getComments(sqlInserts).then((response) => {
//         res.status(200).json(JSON.stringify(response));
//     });
// };
//******************LIKE*****************************

// exports.getAllLikes = (req, res, next) => {
//     postsModels.getAllLikes().then((response) => {
//         res.status(200).json(JSON.stringify(response));
//     });
// };

// exports.postLike = (req, res, next) => {
//     let userId = req.body.userId;
//     let nbLikes = req.body.nbLikes;
//     let postId = req.body.postId;
//     let sqlInserts1 = [postId, userId];
//     let sqlInserts2 = [nbLikes, postId];
//     postsModels.postLike(sqlInserts1, sqlInserts2, req.body.liked).then((response) => {
//         res.status(201).json(JSON.stringify(response));
//     });
// };

//******************POST*****************************

// exports.getAllPosts = (req, res, next) => {
//     postsModels.getAllPosts().then((response) => {
//         res.status(200).json(JSON.stringify(response));
//     });
// };

// exports.deletePost = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decodedToken.userId;
//     let postId = req.params.id;
//     let sqlInserts1 = [postId];
//     let sqlInserts2 = [postId, userId];
//     postsModels
//         .deletePost(sqlInserts1, sqlInserts2)
//         .then((response) => {
//             res.status(200).json(JSON.stringify(response));
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json(JSON.stringify(error));
//         });
// };

// exports.createPost = (req, res, next) => {
//     let title = req.body.title;
//     let userId = req.body.userId;
//     let content = req.body.content;
//     let sqlInserts = [userId, title, content];
//     postsModels.createPost(sqlInserts).then((response) => {
//         res.status(201).json(JSON.stringify(response));
//     });
// };

// exports.updatePost = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decodedToken.userId;
//     let title = req.body.title;
//     let content = req.body.content;
//     let postId = req.params.id;
//     let sqlInserts1 = [postId];
//     let sqlInserts2 = [title, content, postId, userId];
//     postsModels
//         .updatePost(sqlInserts1, sqlInserts2)
//         .then((response) => {
//             res.status(201).json(JSON.stringify(response));
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json(JSON.stringify(error));
//         });
// };
