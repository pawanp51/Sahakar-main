const mongoose = require('mongoose');
const express = require('express');
const taskSchema = new mongoose.Schema({
    
      manager_email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Simple regex for email validation
      },
      employee_email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Simple regex for email validation
      },
      task_name: {
        type: String,
        required: true
      },
      date: {
        type: String, // Preferably change this to `Date` if ISO format is used
        required: true
      },
      assigned_by: {
        type: String,
        required: true
      },
      department: {
        type: String,
        required: true
      },
      status: {
        type: String,
        default: 'pending'
      },
      post: {
        type: String,
        required: true
      },
      time: {
        type: String, // Preferably change this to a `Date` or `Timestamp` field for better handling
        required: true
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'], // Define allowed priority values
        default: 'medium'
      },
      deadline: {
        type: String, // Preferably use `Date` for better date manipulations
        required: true
      },
      description: {
        type: String,
        required: true
      },
      additional_notes: {
        type: String,
        default: ''
      },
      references: {
        type: String,
        default: ''
      },
      res_details: {
        type: String,
        default: ''
      },
      
      res_notes: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
});

const db =  mongoose.model('task', taskSchema);;
module.exports =  db ;
