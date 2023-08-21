const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "الاسم مطلوب"],
			unique: [true, "الاسم موجود بالفعل"],
		},
		description: {
			type: String,
			required: [true, "الوصف مطلوب"],
		},
		url: {
			type: String,
			unique: [true, "الرابط موجود بالفعل"]
		},

	},
	{
		timestamps: true,
	}
);

//Export the model
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
