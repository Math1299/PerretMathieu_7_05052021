// const mysql = require("mysql");
// const connectDb = require("../connectDb");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

// class User {
//     constructor() {}
//     signup(sqlInserts) {
//         let sql = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, NULL)";
//         sql = mysql.format(sql, sqlInserts);
//         return new Promise((resolve, reject) => {
//             connectDb.query(sql, function (err, result) {
//                 if (err) reject({ error });
//                 resolve({ message: "Nouvel utilisateur créé" });
//             });
//         });
//     }
//     login(sqlInserts, password) {
//         let sql = "SELECT id, password FROM users WHERE email = ?"; //recherche dans la bdd en fonction de l'email rentré
//         sql = mysql.format(sql, sqlInserts);
//         // console.log(sql);
//         return new Promise((resolve, reject) => {
//             //recherche si l'utilisateur existe ou pas
//             connectDb.query(sql, function (err, result) {
//                 if (err) reject({ err });
//                 if (!result[0]) {
//                     reject({ error: "Utilisateur inexistant" });
//                 } else {
//                     bcrypt //si l'utilisateur est dans la bdd verification du mdp
//                         .compare(password, result[0].password)
//                         .then((valid) => {
//                             if (!valid) return reject({ error: "Mot de passe incorrect" });
//                             resolve({
//                                 userId: result[0].id,
//                                 token: jwt.sign({ userId: result[0].id, moderation: result[0].moderation }, process.env.JWT_KEY, { expiresIn: "24h" }),
//                                 moderation: result[0].moderation,
//                             });
//                         })

//                         .catch((error) => reject({ error }));
//                 }
//             });
//         });
//     }

//     myProfile(sqlInserts) {
//         let sql = "SELECT firstName, lastName, email FROM users WHERE id = ? ";
//         sql = mysql.format(sql, sqlInserts);
//         return new Promise((resolve, reject) => {
//             connectDb.query(sql, function (err, result) {
//                 if (err) return reject({ error: "Votre profil est inconnu" });
//                 console.log(err);
//                 resolve(result);
//             });
//         });
//     }

//     updateUser(sqlInserts) {
//         let sql = " UPDATE users SET firstName = ?, lastName = ?, email = ?, WHERE id = ?";
//         sql = mysql.format(sql, sqlInserts);
//         return new Promise((resolve, reject) => {
//             connectDb.query(sql, function (err, result) {
//                 if (err) return reject({ error: "Impossible de supprimer cette utilisateur" });
//                 resolve({ message: "Données mises à jour" });
//             });
//         });
//     }
//     deleteUser(sqlInserts) {
//         let sql = "DELETE FROM users WHERE id = ?";
//         sql = mysql.format(sql, sqlInserts);
//         return new Promise((resolve, reject) => {
//             connectDb.query(sql, function (err, result) {
//                 if (err) return reject({ error: "Impossible de supprimer cette utilisateur" });
//                 resolve({ message: "Utilisateur supprimé" });
//             });
//         });
//     }
// }

// module.exports = User;
