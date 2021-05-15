require("dotenv").config(); //STOCK LES CONFIG D ENVIRONNEMENT HORS DU CODE
const mysql = require("mysql"); //UTILISATION DE LA BASE DE DONNEES

//CONNECTION A LA BASE DE DONNEES
let connectDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connectDb.connect(function (err) {
    if (err) {
        console.log("Erreur de connexion à la base de données", err);
        return;
    }
    console.log("Connecté à la base de données MySQL");
});

module.exports = connectDb;
