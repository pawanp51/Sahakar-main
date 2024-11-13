const mongoose = require('mongoose');
const express = require('express');
const taskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    task_id: {
        type: Number,
        required: true,
    },
    task_name: {
        type:String,
        required: true,
    },
    date: {
        type:String,
        required: true,
    },
    assigned_by: {
        type:String,
        required: true,
    },
    department: {
        type:String,
        required: true,
    },
    status: {
        type:String,
        required: true,
    },
});

const db =  mongoose.model('task', taskSchema);;
module.exports =  db ;
