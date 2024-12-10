const express = require('express');
const file_db = require("../Schema/TaskFileSchema");
const getfilesrouter = express.Router();

getfilesrouter.route("/").post(async(req, res) => {
    const {task_id,to} = req.body;
    if (!task_id) {
        return res.status(400).send({message: "Task ID is required"});
    }
    const data = await file_db.find({task_id: task_id,to:to});
    // console.log(data);
    
    res.status(200).send(data)
    // console.log(data);
    
})

getfilesrouter.route("/:id").get(async (req, res) => {
    try {
        const fileId = req.params.id;
        console.log(fileId);
        

        // Find the file by its ID in the database
        const file = await file_db.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Set headers for file download/view
        res.set({
            'Content-Type': file.contentType, // e.g., 'image/jpeg', 'application/pdf'
            'Content-Disposition': `inline; filename="${file.originalName}"`, // 'inline' to view in browser, 'attachment' for download
        });

        // Send the file data (Buffer)
        res.send(file.fileData);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ message: 'Failed to fetch file', error: error.message });
    }
});

module.exports = getfilesrouter;