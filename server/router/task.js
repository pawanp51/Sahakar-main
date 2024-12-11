const express = require('express');
const taskrouter = express.Router();
const db = require("../Schema/TaskSchema");
const { ObjectId } = require('mongodb');


// task route
taskrouter.route("/").post(async (req, res) => {
    const { email ,department} = req.body;
    try {
        const tasks = await db.find({ $or:[
            {employee_email:email},
            {manager_email:email},
            {department:department,type:"conflict"}
        ] }); // Await the findOne operation
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json("Server error");
    }
});

taskrouter.route("/assigntask").post(async(req,res)=>{

    try{

        const {
            manager_email,
            employee_email,
            taskName,
            date,
        assignedBy,
        department,
        status,
        post,
        time,
        priority,
        deadline,
        description,
        additionalNotes,
        references,
        type} = req.body;
        // console.log("Task details:", taskName, date, assignedBy, department, status, post, time, priority, deadline, description, additionalNotes, references);

        
        console.log(manager_email);
        
        const task = new db({
            manager_email,
            employee_email,
            task_name:taskName,
            date,
            assigned_by:assignedBy,
            department,
            status,
            post,
            time,
            priority,
            deadline,
            description,
            additional_notes:additionalNotes,
            references,
            res_details:"",
            res_notes:"",
            type,
        })
        
       const saved_task =  await task.save();
        console.log("Task saved successfully:", task);
        res.status(201).json({id:saved_task._id});
    }catch(error){
        console.error("Error saving task:", error);
        res.status(500).json("Server error");
    }

})

taskrouter.route("/completetask").post(async(req,res)=>{
    try{
        const {task_id,res_details,res_notes} = req.body;
        console.log("Task details:", task_id, res_notes,res_details);
        const updated = await  db.findOneAndUpdate(
            { _id: new ObjectId(task_id) }, // Correctly construct ObjectId
            { $set: { res_details:res_details, res_notes:res_notes, status:"completed" } }, // Update
            { returnDocument: "after" , writeConcern: { w: "majority" }} // Options (return the updated document)
          );
          console.log("updated:",updated);
          
        res.status(200).json("Task updated successfully");
    }catch(error){
        console.error("Error updating task:", error);
        res.status(500).json("Server error");
    }
})

taskrouter.route("/approvetask").post(async (req, res) => {
    const {task_id} = req.body;
    const updated = await  db.findOneAndUpdate(
        { _id: new ObjectId(task_id) }, // Correctly construct ObjectId
        { $set: { status:"approved" } }, // Update
        { returnDocument: "after" , writeConcern: { w: "majority" }} // Options (return the updated document)
      );
      console.log("updated:",updated);
      res.status(200).json("Task updated successfully");

})

module.exports = taskrouter;
