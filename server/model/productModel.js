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
			validate: {
				validator(price) {
					return price > 0;
				},
				message: "السعز يجب ان يكون اكبر من صفر",
			},
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
		brand: {
			type: ObjectId,
			ref: "Brand",
			default: null,
		},
		quantity: {
			type: Number,
			required: true,
		},
		minQuantity: {
			type: Number,
			default: 1,
		},
		sold: {
			type: Number,
			default: 0,
		},
		images: [
			{
				id: Number,
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
		additionalInfo: {
			wight: String,
			dimensions: String,
			special: String,
			infoType: String,
			colors: String,
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);


