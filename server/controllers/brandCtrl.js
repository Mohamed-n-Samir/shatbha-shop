const Brand = require("../model/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../helpers/validateMongodbId");

const createBrand = async (req, res) => {
	const { name, description, url } = req.body;
	if (!name) {
		return res.status(422).json({ error: "الاسم مطلوب" });
	}
	if(!description){
		return res.status(422).json({ error: "الوصف مطلوب" });
	}
	const brandFound = await Brand.find({ name });

	if (brandFound.length > 0) {
		return res.status(422).json({ error: "الماركه موجوده بالفعل" });
	}
	try {
		const brand = await new Brand({ name,description,url }).save();
		res.status(200).json({ message: "تم اضافة العلامة التجارية بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateBrand = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	validateMongoDbId(id);

	try {
		const updatedBrand = await Brand.findByIdAndUpdate(
			id,
			data,
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({message: "تم تعديل العلامة التجارية بنجاح"});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
const deleteBrand = async (req, res) => {
	const { id } = req.body;
	validateMongoDbId(id);
	try {
		await Brand.findByIdAndDelete(id);
		res.status(200).json({ message: "تم حذف العلامة التجارية بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
const getBrand = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const getaBrand = await Brand.findById(id);
		res.json(getaBrand);
	} catch (error) {
		throw new Error(error);
	}
});
const getallBrand = async (req, res) => {
	try {
		const allBrand = await Brand.find();
		res.status(200).json({ allBrand });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
module.exports = {
	createBrand,
	updateBrand,
	deleteBrand,
	getBrand,
	getallBrand,
};
