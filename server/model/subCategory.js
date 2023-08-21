const mongoose = require("mongoose"); // Erase if already required
const { ObjectId } = mongoose.Schema.Types;

// Declare the Schema of the Mongo model
var subCategorySchema = new mongoose.Schema(
	{
        category: {
            type: ObjectId,
            ref: "PCategory",
        },
        subCategory: {
            type: [String],
        }
    },
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("SubCategory", subCategorySchema);
