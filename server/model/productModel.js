const mongoose = require("mongoose"); // Erase if already required
const PCategory = require("./prodcategoryModel");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: true,
		},
		oldPrice: {
			type: Number,
			required: true,
		},
		newPrice: {
			type: Number,
			default: null,
		},
		category: {
			type: ObjectId,
			ref: "PCategory",
			required: true,
		},
		subcategory: {
			type: [ObjectId],
			ref: "SubCategory",
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		sold: {
			type: Number,
			default: 0,
		},
		images: [
			{
				public_id: Number,
				url: String,
			},
		],
		color: [],
		tags: [String],
		ratings: [
			{
				star: Number,
				comment: String,
				postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			},
		],
		totalrating: {
			type: String,
			default: 0,
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
