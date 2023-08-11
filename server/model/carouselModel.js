const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var carouselSchema = new mongoose.Schema(
	{
		label: String,
		description: String,
		images: [
			{
				public_id: String,
				url: String,
				validate: {
					validator(image) {
						return image.url.match(
							/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg|webp|JPG|JPEG|GIF|PNG|SVG|WEBP)$/
						);
					},
					message: "image url must be image url",
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("Carousel", carouselSchema);
