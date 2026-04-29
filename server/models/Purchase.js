const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  name: String,
  email: String,
  productName: String,
  sessionId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);