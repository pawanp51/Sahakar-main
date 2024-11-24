const express = require('express');
const loginrouter = express.Router();
const db = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "THIS_IS_KEY"
// login route
loginrouter.route("/").post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.findOne({ Email: email }); // Await the findOne operation

        if (user) {
            if (user.password === password) {
                // console.log(user);
                
                const token = jwt.sign({user},JWT_SECRET, { expiresIn: '3h' });
                // res.header('auth-token', token).send(token);
                res.status(200).json({msg:"login success", userdata:user , token:token});
            } else {
                res.status(400).json("Invalid password");
            }
        } else {
            res.status(400).json("User not found");
        }
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json("Server error");
    }
});

loginrouter.route("/checklogin").post(async(req, res) => {
    // console.log("here");
    
    const { token } = req.body;
    // decode token 
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(401).json({msg:"Invalid token"});
        } else {
            console.log(decoded);
            
            res.status(200).json({msg:"Token is valid", userdata:decoded});
        }
    });    
})

module.exports = loginrouter;
