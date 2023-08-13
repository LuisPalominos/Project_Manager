// ---------------------------------------------------
// CONFIG SETUP - Authentication
// ---------------------------------------------------

// 1) Importing External Libraries
const jwt = require("jsonwebtoken");

// 2) Exporting a function for checking authentication
module.exports = {
    authentificate: (req, res, next) => {
        console.log(req.cookies);
        if (!req.cookies){
            return res.status(401).json({error: "Not authorized"});
        }
        
        jwt.verify(
            req.cookies.token,
            process.env.SECRET,
            (err, userInfo) => {
                if (err) {
                    res.status(401).json({error: "Not authorized"});
                } else {
                    next();
                }
            }
        )
    }
}