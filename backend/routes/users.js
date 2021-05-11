const express = require("express");
const router = express.Router();

//ASSOCIATION LOGIQUE METIER AVEC LES DIFFERENTES ROUTES
const userCtrl = require("../controllers/user");

//IMPORTATION DES MIDDLEWARES DE VERIFICATION EMAIL ET MDP
const passwordValidator = require("../middleware/password");
const emailValidator = require("../middleware/email");

//CREATION DES 2 ROUTES POST CAR LE FRONT VA AUSSI ENVOYER DES INFOS => EMAIL ET MDP
router.post("/signup", passwordValidator, emailValidator, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
