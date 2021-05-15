const jwt = require("jsonwebtoken");
const connectDb = require("../connectDb");
const mysql = require("mysql");

//METHODE D AUTHENTIFICATION PAR TOKEN
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //REFERENCE AU FORMAT DU TOKEN
        const decodedToken = jwt.verify(token, process.env.JWT_KEY); //ON LE DECODE AVEC VERIFY
        const userId = decodedToken.userId; //ON EXTRAIT LE USERID
        let sqlInserts = [userId];
        let sql = "SELECT COUNT(id) FROM users WHERE id=? ";
        sql = mysql.format(sql, sqlInserts);
        connectDb.query(sql, function (err, result) {
            if (err) reject({ error });
            if (result[0]["COUNT(id)"] !== 1) {
                throw "TOKEN non valable";
            } else {
                next();
            }
        });
    } catch (error) {
        res.status(401).json({ error: error | "Requête non identifiée" });
    }
};
