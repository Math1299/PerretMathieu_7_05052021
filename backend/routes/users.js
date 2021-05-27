//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const userCtrl = require("../controllers/user");

//importation des middlewares de vérification email et mdp
const passwordValidator = require("../middleware/password");
const emailValidator = require("../middleware/email");
const auth = require("../middleware/auth");

//création de deux routes POST car le front va aussi envoyer des infos ==> email et mdp
try {
    router.post("/signup", passwordValidator, emailValidator, userCtrl.signup);
    router.post("/login", userCtrl.login);
    router.put("/:id/update", auth, userCtrl.update);
    router.delete("/:id/delete", auth, userCtrl.delete);
    // router.get("/:id", auth, userCtrl.myProfile);
} catch (error) {
    console.log(error);
}
module.exports = router;
