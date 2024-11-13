const mongoose = require('mongoose');
const express = require('express');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
});

const db =  mongoose.model('user', userSchema);;
module.exports =  db ;
