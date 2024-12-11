const mongoose = require('mongoose');

// Define schema for GIS Request
const GISRequestAcceptSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  coordinates: {
    type: [[Number]], // Array of arrays for storing latitude and longitude pairs
    required: true,
    validate: {
      validator: function (v) {
        // Validate each coordinate pair to ensure it's a two-item array of numbers
        return Array.isArray(v) && v.every(pair => Array.isArray(pair) && pair.length === 2);
      },
      message: 'Coordinates must be an array of [latitude, longitude] pairs.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create and export the model
const GISRequestAccept = mongoose.model('GISRequestAccept', GISRequestAcceptSchema);

module.exports = GISRequestAccept;
