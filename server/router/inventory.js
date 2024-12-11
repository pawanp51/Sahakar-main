const express = require('express');
const inventoryrouter = express.Router();
const db = require("../Schema/InventorySchema");
const { ObjectId } = require('mongodb');

// inventoryrouter.route("/").post(async (req, res) => {
//     const { email } = req.body;
//     try {
//         const tasks = await db.find({ $or:[
//             {request_email:email},
//             // {manager_email:email},
//         ] }); // Await the findOne operation
//         res.status(200).json(tasks);
//     } catch (error) {
//         console.error("Error finding user:", error);
//         res.status(500).json("Server error");
//     }
// });

inventoryrouter.route("/requestinventory").post(async(req,res)=>{

    try{

        const {
            // manager_email,
            employee_email,
            date,
        department,
        inventory,
        status,
        deadline,
        description,
        additionalNotes} = req.body;
        // console.log("Task details:", taskName, date, assignedBy, department, status, post, time, priority, deadline, description, additionalNotes, references);

        
        
        const task = new db({
            // manager_email,
            employee_email,
            date,
            department,
            inventory,
            status,
            deadline,
            description,
            additional_notes:additionalNotes,
            res_details:"",
            res_notes:""
        })
       const saved_task =  await task.save();
        console.log("request saved successfully:", task);
        res.status(201).json({id:saved_task._id});
    }catch(error){
        console.error("Error saving inventory request:", error);
        res.status(500).json("Server error");
    }

})

module.exports = inventoryrouter;
