const mongoose = require('mongoose');
const express = require('express');
const inventorySchema = new mongoose.Schema({
    
    //   manager_email: {
    //     type: String,
    //     required: true,
    //     match: /.+\@.+\..+/ // Simple regex for email validation
    //   },
      request_email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Simple regex for email validation
      },
      date: {
        type: String, // Preferably change this to `Date` if ISO format is used
        required: true
      },
      department: {
        type: String,
        required: true
      },
      inventory: {
        type: String,
        required: true
      },
      status: {
        type: String,
        default: 'pending'
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
      res_details: {
        type: String,
        default: ''
      },
      res_notes: {
        type: String,
        default: ''
      },
    
});

const db =  mongoose.model('inventory', inventorySchema);;
module.exports =  db ;
