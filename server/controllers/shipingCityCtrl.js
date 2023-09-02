const City = require("../model/shipingCity");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../helpers/validateMongodbId");

const addCity = async (req, res) => {
	const { name, shippingCharge } = req.body;
	try {
		if (!name) return res.status(400).json({ error: "اسم المدينه مطلوب" });
		if (name.length < 3)
			return res.status(400).json({
				message: "اسم المدينة لا يمكن ان يكون اقل من 3 احرف",
			});
		if (!shippingCharge)
			return res.status(400).json({ error: "رسوم الشحن مطلوبة" });
		if (shippingCharge < 0)
			return res
				.status(400)
				.json({ error: "رسوم الشحن لا يمكن ان تكون اقل من 0" });
		const newCity = await new City({
			name,
			shippingCharge,
		}).save();
		res.status(200).json({ message: "تم اضافة المدينة بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getCities = async (req, res) => {
	try {
		const allCities = await City.find().sort({ createdAt: -1 });
		res.status(200).json({ allCities });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateCity = async (req, res) => {
	const { id } = req.params;
	const { shippingCharge, name } = req.body;
	validateMongoDbId(id);
	try {
		if (shippingCharge && shippingCharge < 0)
			return res.status(400).json({
				message: "رسوم الشحن لا يمكن ان تكون اقل من 0",
			});
		if (name && name.length < 3)
			return res.status(400).json({
				message: "اسم المدينة لا يمكن ان يكون اقل من 3 احرف",
			});

		const city = await City.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({ message: "تم تعديل المدينة بنجاح" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteCity = async (req, res) => {
	const { id } = req.body;
	console.log(id);
	validateMongoDbId(id);
	try {
		const deletedColor = await City.findByIdAndDelete(id);
		res.status(200).json({ message: "تم حذف المدينة بنجاح" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// const updateColor = asyncHandler(async (req, res) => {
// 	const { id } = req.params;
// 	validateMongoDbId(id);
// 	try {
// 		const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
// 			new: true,
// 		});
// 		res.json(updatedColor);
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// });
// const deleteColor = asyncHandler(async (req, res) => {
// 	const { id } = req.params;
// 	validateMongoDbId(id);
// 	try {
// 		const deletedColor = await Color.findByIdAndDelete(id);
// 		res.json(deletedColor);
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// });

// const getallColor = asyncHandler(async (req, res) => {
// 	try {
// 		const getallColor = await Color.find();
// 		res.json(getallColor);
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// });
module.exports = {
	addCity,
	getCities,
	updateCity,
	deleteCity,
};
