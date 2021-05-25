const bcrypt = require("bcrypt"); //package de cryptage des mdp
const jwt = require("jsonwebtoken"); //package pour encoder les tokens
// const maskemail = require("maskemail"); //permet de masquer les emails dans la bd
// const mysql = require("mysql");
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

const User = require("../models/User");
let user = new User();

//middleware pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    console.log(req.body);
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let password = req.body.password;
    bcrypt
        .hash(password, 10)
        .then((hash) => {
            let sqlInserts = [lastName, firstName, email, hash];
            user.signup(sqlInserts)
                .then(() => {
                    res.status(200).json({ message: "Utilisateur créé " });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ error });
                });
        })
        .catch((error) => res.status(500).json({ error }));
};

//middleware pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
    let email = req.body.email; //on récupère email et mdp afin de vérfier la correspondance
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

//middleware pour visualiser les utilisateurs existants
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

//middleware pour modifier les utilisateurs existants
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

//middleware pour effacer un utilisateur existant
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
