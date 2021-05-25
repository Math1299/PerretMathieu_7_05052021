//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const userCtrl = require("../controllers/user");

//importation des middlewares de vérificatioj email et mdp
const passwordValidator = require("../middleware/password");
const emailValidator = require("../middleware/email");
const auth = require("../middleware/auth");

//création de deux routes POST car le front va aussi envoyer des infos ==> email et mdp
router.post("/signup", passwordValidator, emailValidator, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("./", auth, userCtrl.myProfile);
router.delete("./", auth, userCtrl.deleteUser);
router.put("./", auth, userCtrl.updateUser);

module.exports = router;
