const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet"); //PLUGIN DE PROTECTION DES HEADERS
const path = require("path"); //POUR ACCEDER AU CHEMIN DE FICHIER
const ratelimit = require("express-rate-limit"); //LIMITATION DES DEMANDES D ACCES REPETEES A L API

const limiter = ratelimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: "Too many request from this IP",
});

//IMPORT DE NOS ROUTERS
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

const app = express();
app.use(helmet());

//MIDDLEWARE GENERAL POUR EVITER LES PB DE CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// app.use((req, res, next) => {
//     res.json({ message: "Votre requête a bien été reçue !" });
//     next();
// });

//METHODE D EXPRESS PERMETTANT DE TRANSFORMER LE CORPS DE LA REQUETE EN JSON UTILISABLE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes); //IMPORT DES ROUTES DEPUIS LE CONTROLLER USER.JS
app.use("/api/posts", postRoutes); // IMPORT DES ROUTES DEPUIS LE CONTROLLER POSTS.JS

module.exports = app;
