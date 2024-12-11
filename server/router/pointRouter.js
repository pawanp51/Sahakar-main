const express = require('express');
const project_db = require("../Schema/Points")
const pointRouter = express.Router();

pointRouter.route("/").get(async(req, res) => {
    const data = await project_db.find({});
    res.status(200).send(data)
    // console.log(data);
    
})

pointRouter.route("/").post(async(req, res) => {
    const { projectName, coordinates ,department,color} = req.body;
    try{

        const points = new project_db({
            projectName,
            department, 
            coordinates,
            color,
        })
       const saved_points =  await points.save();
        console.log("Points saved successfully:", points);
        res.status(201).json({id:saved_points._id});
    }catch(error){
        console.error("Error saving points:", error);
        res.status(500).json("Server error");
    }
    
})

module.exports = pointRouter;