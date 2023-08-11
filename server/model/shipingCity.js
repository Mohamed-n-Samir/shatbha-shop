const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const shipingCity = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    shippingCharge:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("City", shipingCity);
