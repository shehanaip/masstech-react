const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  whatsapp: String,
  service: String,
  details: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ServiceRequest", ServiceRequestSchema);