const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: [true, "الرجاء ادخال الاسم الاول"]

		},
		lastname: {
			type: String,
			required: [true, "الرجاء ادخال الاسم الاخير"],
		},
		email: {
			type: String,
			required: [true, "الرجاء ادخال البريد الالكتروني"],
			unique: true,
		},
		mobile: {
			type: String,
			required: [true, "الرجاء ادخال رقم الهاتف"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "الرجاء ادخال كلمة المرور"],
		},
		role: {
			type: String,
			default: "user",
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		cart: {
			type: Array,
			default: [],
		},
		city: {
			type: ObjectId,
			required: [true,"الرجاء اختيار المدينة"],
			ref: "City",
		},
		area: {
			type: String,
			required: [true,"الرجاء اختيار المنطقة"]

		},
		buildingAndApartment: {
			type: String,
			required: [true,"الرجاء ادخال رقم المبنى"]

		},
		gender:{
			type:String,
			enum: ["Male","Female"],
			required: [true,"الرجاء اختيار الجنس"]
		},
		wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
		refreshToken: {
			type: String,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSaltSync(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
	const resettoken = crypto.randomBytes(32).toString("hex");
	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resettoken)
		.digest("hex");
	this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
	return resettoken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
