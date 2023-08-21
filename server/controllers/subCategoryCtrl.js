const SubCategory = require("../model/subCategory.js");
const Category = require("../model/prodcategoryModel.js");
const validateMongoDbId = require("../helpers/validateMongodbId");

const getCreateSubCategory = async (req, res) => {
	const { id: categoryID } = req.params;

	try {
		validateMongoDbId(categoryID);
		const categoryFound = await Category.findById(categoryID);
		if (!categoryFound) {
			return res.status(404).json({ error: "القسم غير موجود" });
		}
		const subCategory = await SubCategory.find({
			category: categoryID,
		});
		if (subCategory.length > 0) {
			return res.status(200).json({ subCategory: subCategory[0] });
		} else {
			const newSubCategory = await SubCategory.create({
				category: categoryID,
				subCategory: [],
			});
			return res.status(200).json({ subCategory: newSubCategory });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateSubCategory = async (req, res) => {
	const { id } = req.params;
	const { subCategory } = req.body;
	validateMongoDbId(id);
	if (!subCategory) {
		return res.status(422).json({ error: "الاقسام الفرعيه مطلوبه" });
	}
	try {
		await SubCategory.findByIdAndUpdate(
			id,
			{ subCategory },
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({ message: "تم تعديل الاقسام الفرعيه بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllSubCategory = async (req, res) => {
	try {
		const subCat = [];
		const allSubCategory = await SubCategory.find();
		if (allSubCategory.length > 0) {
			allSubCategory.map((item) => {
				item.subCategory.forEach((sub) => {
					subCat.push({ value: sub, label: sub });
				});
			});
		}
		res.status(200).json({ subCategories: subCat });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllData = async (req, res) => {
	try {
		const allSubCategory = await SubCategory.find().populate("category");
		res.status(200).json({ allSubCategory });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


const deleteCategory = async (req, res) => {
	const { id } = req.body;
	try {
		validateMongoDbId(id);
		await Category.findByIdAndDelete(id);
		res.status(200).json({ message: "تم حذف العلامة التجارية بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getCategory = async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const getaCategory = await Category.findById(id);
		res.json(getaCategory);
	} catch (error) {
		throw new Error(error);
	}
};

const getallCategory = async (req, res) => {
	try {
		const allCategory = await Category.find();
		res.status(200).json(allCategory);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getCreateSubCategory,
	updateSubCategory,
	deleteCategory,
	getCategory,
	getallCategory,
	getAllSubCategory,
	getAllData
};
