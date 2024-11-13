const express = require('express');
const project_db = require("../Schema/ProjSchema")
const projectrouter = express.Router();

projectrouter.route("/").get(async(req, res) => {
    const data = await project_db.find({});
    res.status(200).send(data)
    // console.log(data);
    
})

module.exports = projectrouter;