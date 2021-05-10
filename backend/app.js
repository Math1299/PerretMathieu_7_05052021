const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//MIDDLEWARE GENERAL POUR EVITER LES PB DE CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

//METHODE D EXPRESS PERMETTANT DE TRANSFORMER LE CORPS DE LA REQUETE EN JSON UTILISABLE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
