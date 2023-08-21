const Category = require("../model/prodcategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../helpers/validateMongodbId");

const createCategory = async (req, res) => {
	const { title } = req.body;
	if (!title) {
		return res.status(422).json({ error: "الاسم مطلوب" });
	}
	const categoryFound = await Category.find({ title });

	if (categoryFound.length > 0) {
		return res.status(422).json({ error: "القسم موجود بالفعل" });
	}
	try {
		const newCategory = await new Category({ title }).save();
		res.status(200).json({ message: "تم اضافة القسم بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	validateMongoDbId(id);
	if (!title) {
		return res.status(422).json({ error: "الاسم مطلوب" });
	}
	try {
		await Category.findByIdAndUpdate(
			id,
			{ title },
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({ message: "تم تعديل القسم بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
const deleteCategory = async (req, res) => {
	const { id } = req.body;
	try {
		validateMongoDbId(id);
		await Category.findByIdAndDelete({_id: id});
		res.status(200).json({ message: "تم حذف العلامة التجارية بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const getaCategory = await Category.findById(id);
		res.json(getaCategory);
	} catch (error) {
		throw new Error(error);
	}
});

const getallCategory = async (req, res) => {
	try {
		const allCategory = await Category.find();
		res.status(200).json(allCategory);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createCategory,
	updateCategory,
	deleteCategory,
	getCategory,
	getallCategory,
};
