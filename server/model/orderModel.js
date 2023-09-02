const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
	{
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				quantity: Number,
			},
		],
		paymentIntent: {},
		orderStatus: {
			type: String,
			default: "Not Processed",
			enum: [
				"Not Processed",
				"Processing",
				"Dispatched",
				"Cancelled",
				"Delivered",
			],
		},
		orderby: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		destinationAddress: {
			type:String,
			required: true,
		
		},
		notes: {type:String},
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
