const bcrypt = require("bcrypt"); //package de cryptage des mdp
const jwt = require("jsonwebtoken"); //package pour encoder les tokens
// const maskemail = require("maskemail"); //permet de masquer les emails dans la bd
// const mysql = require("mysql");
const connectDb = require("../connectDb");
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

//middleware pour l'enregistrement de nouveaux utilisateurs et hashage du mot de passe
exports.signup = (req, res, next) => {
    console.log(req.body);

    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    let sqlSignup;
    let sqlInserts;

    bcrypt
        .hash(password, 10)
        .then((hash) => {
            sqlSignup = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, NULL)";
            sqlInserts = [lastName, firstName, email, hash];
            connectDb.query(sqlSignup, sqlInserts, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err.message);
                }
                res.status(200).json({ message: "Nouvel utilisateur créé " });
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

//middleware pour connecter les utilisateurs existants

exports.login = (req, res, next) => {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const sqlLogin = "SELECT id, password FROM users WHERE email = ?";

    //recherche dans la bdd en fonction de l'email rentré
    connectDb.query(sqlLogin, [email], function (err, result) {
        if (err) {
            return res.status(501).json(err.message);
        }
        if (result.length === 0) {
            return res.status(400).json({ error: "Utilisateur inexistant" });
        }
        //vérification du mdp avec bcrypt
        bcrypt
            .compare(password, result[0].password)
            .then((valid) => {
                if (!valid) {
                    return res.status(400).json({ error: "Mot de passe incorrect" });
                }
                res.status(200).json({
                    userId: result[0].id,
                    token: jwt.sign({ userId: result[0].id }, process.env.JWT_KEY, { expiresIn: "24h" }),
                });
                console.log(`connecté`);
            })
            .catch((error) => res.status(500).json({ error }));
    });
};

//middleware pour supprimer un utilisateur existant

exports.delete = (req, res, next) => {
    const userId = req.params.id;
    const sqlDeleteUser = "DELETE FROM users WHERE id = ?";
    const sqlInserts = [userId];
    connectDb.query(sqlDeleteUser, sqlInserts, function (err, result) {
        if (err) {
            return res.status(501).json(err.message);
        } else {
            return res.status(200).json({ message: "Utilisateur supprimé" });
        }
    });
};

//middleware pour modifier les utilisateurs existants

exports.update = (req, res, next) => {
    const userId = req.params.id;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;

    // const password = req.body.password;

    let sqlUpdateUser = " UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?";
    let sqlInserts = [firstName, lastName, email, userId];

    connectDb.query(sqlUpdateUser, sqlInserts, function (err, result) {
        if (err) {
            return res.status(501).json(err.message);
        } else {
            return res.status(200).json({ message: "Données utilisateur mises à jour" });
        }
    });
};

//middleware pour visualiser son profil utilisateur
// exports.myProfile = (req, res, next) => {
//     //on récupère le userId qui se trouve dans le token
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decodedToken.userId;
//     let sqlInserts = [userId];
//     user.myProfile(sqlInserts)
//         .then(() => {
//             res.status(200).json({ message: "Bienvenue sur votre profil utilisateur" });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json({ error });
//         });
// };

// exports.updateUser = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decodedToken.userId;
//     let email = req.body.email;
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     let sqlInserts = [firstName, lastName, email, userId];
//     user.updateUser(sqlInserts)
//         .then(() => {
//             res.status(200).json({ message: "Données utilisateur mises à jour" });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json({ error });
//         });
// };

// const User = require("../models/User");
// let user = new User();

// exports.signup = (req, res, next) => {
//     console.log(req.body);
//     let lastName = req.body.lastName;
//     let firstName = req.body.firstName;
//     let email = req.body.email;
//     let password = req.body.password;
//     bcrypt
//         .hash(password, 10)
//         .then((hash) => {
//             let sqlInserts = [lastName, firstName, email, hash];
//             user.signup(sqlInserts)
//                 .then(() => {
//                     res.status(200).json({ message: "Nouvel utilisateur créé " });
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     res.status(400).json({ error });
//                 });
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

// exports.login = (req, res, next) => {
//     let email = req.body.email; //on récupère email et mdp afin de vérfier la correspondance
//     let password = req.body.password;
//     let sqlInserts = [email];
//     user.login(sqlInserts, password)
//         .then(() => {
//             res.status(200).json({ message: "Utilisateur connecté" });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json({ error });
//         });
// };

// exports.delete = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decodedToken.userId;
//     let sqlInserts = [userId];
//     user.deleteUser(sqlInserts)
//         .then(() => {
//             res.status(200).json({ message: "Utilisateur supprimé" });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json({ error });
//         });
// };

// exports.delete = (req, res, next) => {
//     // console.log(password);
//     const password = req.body.password;
//     const userId = res.locals.userId;

//     let passCrypt;
//     let sqlFindOneUser;
//     let sqlDeleteUser;

//     sqlFindOneUser = "SELECT password FROM users WHERE id = ?"; //on recherche l'utilisateur dans la bdd
//     connectDb.query(sqlFindOneUser, [userId], function (err, result) {
//         if (err) {
//             return res.status(501).json(err.message);
//         }
//         if (result.length == 0) {
//             return res.status(400).json({ error: "Utilisateur inexistant" });
//         }
//         passCrypt = result[0].password;
//         console.log(passCrypt);
//         // on compare le mot de passe entrée avec le hash stocké dans la bdd
//         bcrypt
//             .compare(password, passCrypt)
//             .then((valid) => {
//                 if (!valid) {
//                     return res.status(400).json({ error: "Mot de passe incorrect" });
//                 }
//                 // si les 2 correspondent alors on supprime le user
//                 sqlDeleteUser = "DELETE FROM users WHERE id = ?";
//                 connectDb.query(sqlDeleteUser, [userId], function (err, result) {
//                     if (err) {
//                         console.log(err);
//                         return res.status(500).json(err.message);
//                     }
//                     res.status(200).json({ message: "Utilisateur supprimé" });
//                 });
//             })
//             .catch((error) => res.status(500).json({ error }));
//         console.log(error);
//     });
// };
