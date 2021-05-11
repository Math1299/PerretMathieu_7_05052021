const bcrypt = require("bcrypt"); // PACKAGE DE CRYPTAGE DES MDP
const jwt = require("jsonwebtoken"); //PACKAGE POUR ENCODER LES TOKENS
const maskemail = require("maskemail"); //PERMET DE MASQUER LES EMAILS DANS LA BD

const User = require("../models/User");

//MIDDLEWARE POUR L ENREGISTREMENT DE NOUVEAUX UTILISATEURS
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: maskemail(req.body.email, { allowed: /@\.-/ }),
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

//MIDDLEWARE POUR CONNECTER LES UTILISATEURS EXISTANTS
exports.login = (req, res, next) => {
    User.findOne({ email: maskemail(req.body.email) })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, `${process.env.JWT_KEY}`, { expiresIn: "24h" }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
