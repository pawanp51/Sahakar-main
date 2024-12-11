const mongoose = require('mongoose');

const complaints = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    location: String,
    department: String,
});

module.exports = mongoose.model('complaints', complaints);
  