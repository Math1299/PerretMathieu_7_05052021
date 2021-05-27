require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement
const jwt = require("jsonwebtoken");

//méthode d'authentification par token
module.exports = (req, res, next) => {
    try {
        //vérification du token
        const token = req.headers.authorization.split(" ")[1]; //référence au format du token on récupère la seconde partie
        const decodedToken = jwt.verify(token, process.env.JWT_KEY); //on le décode avec verify
        req.params.id = decodedToken.userId; //on extrait le userId du Token
        console.log(token);
        console.log(decodedToken);
        next();
    } catch (error) {
        res.status(401).json({ error: "Requête non identifiée" });
    }
};
// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//         const userId = decodedToken.userId;
//         if (req.body.userId && req.body.userId !== userId) {
//             throw "ID utilisateur invalide";
//         } else {
//             next();
//         }
//     } catch (error) {
//         res.status(401).json({ error: "Requête non identifiée" });
//     }
// };
