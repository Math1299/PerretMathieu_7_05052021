const bcrypt = require("bcrypt"); // PACKAGE DE CRYPTAGE DES MDP
const jwt = require("jsonwebtoken"); //PACKAGE POUR ENCODER LES TOKENS
// const maskemail = require("maskemail"); //PERMET DE MASQUER LES EMAILS DANS LA BD
const mysql = require("mysql");

const User = require("../models/User");
let user = new User();

//MIDDLEWARE POUR L ENREGISTREMENT DE NOUVEAUX UTILISATEURS
exports.signup = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt
        .hash(password, 10)
        .then((hash) => {
            let sqlInserts = [lastName, firstName, email, hash];
            user.signup(sqlInserts)
                .then(() => {
                    res.status(200).json({ message: "Utilisateur connecté" });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        })
        .catch((error) => res.status(500).json({ error }));
};

//MIDDLEWARE POUR CONNECTER LES UTILISATEURS EXISTANTS
exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sqlInserts = [email];
    user.login(sqlInserts, password)
        .then(() => {
            res.status(200).json({ message: "Utilisateur connecté" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//MIDDLEWARE POUR VISUALISER LES UTILISATEURS EXISTANTS
exports.myProfile = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    user.myProfile(sqlInserts)
        .then(() => {
            res.status(200).json({ message: "Profil utilisateur" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//MIDDLEWARE POUR MODIFIER LES UTILISATEURS EXISTANTS
exports.updateUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let sqlInserts = [firstName, lastName, email, userId];
    user.updateUser(sqlInserts)
        .then(() => {
            res.status(200).json({ message: "Données utilisateur mises à jour" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//MIDDLEWARE POUR EFFACER LES UTILISATEURS EXISTANTS
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    user.deleteUser(sqlInserts)
        .then(() => {
            res.status(200).json({ message: "Utilisateur supprimé" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
