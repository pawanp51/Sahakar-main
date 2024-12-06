const express = require('express');
const taskrouter = express.Router();
const db = require("../Schema/TaskSchema");

// task route
taskrouter.route("/").post(async (req, res) => {
    const { email } = req.body;
    try {
        const tasks = await db.find({ $or:[
            {employee_email:email},
            {manager_email:email},
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
        references} = req.body;
        // console.log("Task details:", taskName, date, assignedBy, department, status, post, time, priority, deadline, description, additionalNotes, references);

        
        
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
            references
        })
       const saved_task =  await task.save();
        console.log("Task saved successfully:", task);
        res.status(201).json({id:saved_task._id});
    }catch(error){
        console.error("Error saving task:", error);
        res.status(500).json("Server error");
    }

})
module.exports = taskrouter;
