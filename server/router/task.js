const express = require('express');
const taskrouter = express.Router();
const db = require("../Schema/TaskSchema");

// task route
taskrouter.route("/").post(async (req, res) => {
    const { email } = req.body;

    try {
        const tasks = await db.find({ email: email }); // Await the findOne operation

        
        
        res.status(200).json(tasks);



    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json("Server error");
    }
});

module.exports = taskrouter;
