const Product = require("../model/productModel");
const SubCategory = require("../model/subCategory");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../helpers/validateMongodbId");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
	const {
		title,
		description,
		oldPrice,
		category,
		brand,
		quantity,
		images,
		tags,
	} = req.body;
	try {
		if (!title) return res.status(422).json({ error: "العنوان مطلوب" });
		if (title.length < 3)
			return res
				.status(422)
				.json({ error: "العنوان يجب ان يكون اطول من ثلاث حروف" });
		if (!description) return res.status(422).json({ error: "الوصف مطلوب" });
		if (description.length < 10)
			return res
				.status(422)
				.json({ error: "الوصف يجب ان يكون اطول من عشرة حروف" });
		if (!oldPrice) return res.status(422).json({ error: "السعر مطلوب" });
		if (oldPrice < 0)
			return res
				.status(422)
				.json({ error: "السعر يجب ان يكون اكبر من صفر" });
		if (!category) return res.status(422).json({ error: "القسم مطلوب" });
		if (validateMongoDbId(category))
			return res.status(422).json({ error: "القسم غير صحيح" });
		if (!quantity) return res.status(422).json({ error: "الكميه مطلوبه" });
		if (quantity < 0)
			return res
				.status(422)
				.json({ error: "الكميه يجب ان تكون اكبر من الصفر" });
		if (!images) return res.status(422).json({ error: "الصور مطلوبه" });
		if (images.length < 1)
			return res
				.status(422)
				.json({ error: "يجب ان تكون هناك صورة واحدة على الاقل" });

		images.forEach((image) => {
			if (!image.url)
				return res.status(422).json({ error: "الصورة مطلوبه" });
			else if (
				!image?.url?.match(
					/^(http(s?):)\/\/.*\.(?:jpg|jpeg|gif|png|svg|webp|JPG|JPEG|GIF|PNG|SVG|WEBP)$/
				)
			)
				return res.status(422).json({ error: "الصورة غير صحيحه" });
		});

		if (!tags) return res.status(422).json({ error: "التاج مطلوب" });
		if (tags.length < 1)
			return res
				.status(422)
				.json({ error: "يجب ان يكون هناك تاج واحد على الاقل" });

		const slug = title ? slugify(title) : null;
		const newProduct = await new Product({
			title,
			slug,
			description,
			oldPrice,
			newPrice: oldPrice,
			category,
			brand: brand === "" ? null : brand,
			quantity,
			images,
			tags,
		}).save();
		return res.status(201).json({ message: "تم اضافه المنتج بنجاح" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateProduct = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	// validateMongoDbId(id);

	try {
		const updateProduct = await Product.findByIdAndUpdate(
			{ _id: id },
			data,
			{
				new: true,
				runValidators: true,
			}
		);
		console.log(updateProduct);
		res.status(200).json({ message: "تم تعديل المنتج بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteProduct = async (req, res) => {
	const { id } = req.body;
	validateMongoDbId(id);
	console.log(id);
	try {
		const deleteProduct = await Product.findOneAndDelete({ _id: id });
		res.status(200).json({ message: "تم حذف المنتج بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getaProduct = async (req, res) => {
	const { slug } = req.params;

	console.log(slug);

	if (!slug) return res.status(422).json({ error: "المنتج غير موجود" });
	try {
		const findProduct = await Product.findOne({ slug: slug })
			.populate("category")
			.populate("brand");
		res.status(200).json(findProduct);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllProduct = asyncHandler(async (req, res) => {
	try {
		const allProduct = await Product.find({ minQuantity: { $eq: 1 } })
			.populate("category")
			.populate("brand")
			.sort({ createdAt: -1 });
		res.json(allProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const getAllGomla = async (req, res) => {
	try {
		// Filtering
		const queryObj = { ...req.query };
		const excludeFields = ["page", "sort", "limit", "fields", "tags"];
		let queryStr;
		let query;
		let subCategory;
		if (queryObj) {
			excludeFields.forEach((el) => delete queryObj[el]);
			queryStr = JSON.stringify(queryObj);
			queryStr = queryStr.replace(
				/\b(gte|gt|lte|lt)\b/g,
				(match) => `$${match}`
			);

			console.log(queryStr);
			console.log(JSON.parse(queryStr));

			query = {
				...JSON.parse(queryStr),
				minQuantity: {
					$gt: 1,
				},
			};

			if (req.query.title) {
				query = {
					...query,
					title: new RegExp(req.query.title, "i"),
				};
				console.log(query);
			}

			if (req.query.tags) {
				console.log(req.query.tags);
				if (mongoose.Types.ObjectId.isValid(req.query.tags)) {
					console.log("halawaaaaaaaaaaaaaaaa111" + req.query.tags);
					query = Product.find({
						...query,
						$or: [
							{
								tags: {
									$elemMatch: {
										$in: await SubCategory.find({
											category: req.query.tags,
										}).distinct("subCategory"),
									},
								},
							},
							{
								category: req.query.tags,
							},
						],
					}).populate("category");
					subCategory = await SubCategory.findOne({
						category: req.query.tags,
					}).populate("category");
				} else {
					query = Product.find({
						...query,
						tags: req.query.tags,
					}).populate("category");
				}
			} else {
				query = Product.find(query).populate("category");
			}
		}

		// Sorting

		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			query = query.sort(sortBy);
		} else {
			query = query.sort("-createdAt");
		}

		// limiting the fields

		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			query = query.select(fields);
		} else {
			query = query.select("-__v");
		}

		const productCount = await Product.find(query).countDocuments();

		// pagination

		// let productCount = 12

		const page = req.query.page || 1;
		const limit = req.query.limit || 5;
		const skip = (page - 1) * limit;
		query = query.skip(skip).limit(limit);

		if (skip >= productCount && page > 1)
			return res.status(404).json({ message: "هذه الصفحه غير موجوده" });

		const products = await query;

		res.status(200).json({
			products: {
				productCount,
				products,
				category:
					subCategory !== {} ? subCategory?.category?.title : null,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};

const getAllProduct1 = async (req, res) => {
	try {
		// Filtering
		const queryObj = { ...req.query };
		const excludeFields = ["page", "sort", "limit", "fields", "tags"];
		let queryStr;
		let query;
		let subCategory;
		if (queryObj) {
			excludeFields.forEach((el) => delete queryObj[el]);
			queryStr = JSON.stringify(queryObj);
			queryStr = queryStr.replace(
				/\b(gte|gt|lte|lt)\b/g,
				(match) => `$${match}`
			);

			console.log(queryStr);
			console.log(JSON.parse(queryStr));

			query = {
				...JSON.parse(queryStr),
				$or: [
					{
						minQuantity: 1,
					},
					{
						minQuantity: {
							$exists: false,
						},
					},
					{
						minQuantity: null,
					},
				],
			};

			if (req.query.title) {
				query = {
					...query,
					title: new RegExp(req.query.title, "i"),
				};
				console.log(query);
			}

			if (req.query.tags) {
				console.log(req.query.tags);
				if (mongoose.Types.ObjectId.isValid(req.query.tags)) {
					console.log("halawaaaaaaaaaaaaaaaa111" + req.query.tags);
					query = Product.find({
						...query,
						$or: [
							{
								tags: {
									$elemMatch: {
										$in: await SubCategory.find({
											category: req.query.tags,
										}).distinct("subCategory"),
									},
								},
							},
							{
								category: req.query.tags,
							},
						],
					}).populate("category");
					subCategory = await SubCategory.findOne({
						category: req.query.tags,
					}).populate("category");
				} else {
					query = Product.find({
						...query,
						tags: req.query.tags,
					}).populate("category");
				}
			} else {
				query = Product.find(query).populate("category");
			}
		}

		// Sorting

		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			query = query.sort(sortBy);
		} else {
			query = query.sort("-createdAt");
		}

		// limiting the fields

		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			query = query.select(fields);
		} else {
			query = query.select("-__v");
		}

		const productCount = await Product.find(query).countDocuments();

		// pagination

		// let productCount = 12

		const page = req.query.page || 1;
		const limit = req.query.limit || 5;
		const skip = (page - 1) * limit;
		query = query.skip(skip).limit(limit);

		if (skip >= productCount && page > 1)
			return res.status(404).json({ message: "هذه الصفحه غير موجوده" });

		const products = await query;

		res.status(200).json({
			products: {
				productCount,
				products,
				category:
					subCategory !== {} ? subCategory?.category?.title : null,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};

const addToWishlist = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { prodId } = req.body;
	try {
		const user = await User.findById(_id);
		const alreadyadded = user.wishlist.find(
			(id) => id.toString() === prodId
		);
		if (alreadyadded) {
			let user = await User.findByIdAndUpdate(
				_id,
				{
					$pull: { wishlist: prodId },
				},
				{
					new: true,
				}
			);
			res.json(user);
		} else {
			let user = await User.findByIdAndUpdate(
				_id,
				{
					$push: { wishlist: prodId },
				},
				{
					new: true,
				}
			);
			res.json(user);
		}
	} catch (error) {
		throw new Error(error);
	}
});

const rating = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { star, prodId, comment } = req.body;
	try {
		const product = await Product.findById(prodId);
		let alreadyRated = product.ratings.find(
			(userId) => userId.postedby.toString() === _id.toString()
		);
		if (alreadyRated) {
			const updateRating = await Product.updateOne(
				{
					ratings: { $elemMatch: alreadyRated },
				},
				{
					$set: {
						"ratings.$.star": star,
						"ratings.$.comment": comment,
					},
				},
				{
					new: true,
				}
			);
		} else {
			const rateProduct = await Product.findByIdAndUpdate(
				prodId,
				{
					$push: {
						ratings: {
							star: star,
							comment: comment,
							postedby: _id,
						},
					},
				},
				{
					new: true,
				}
			);
		}
		const getallratings = await Product.findById(prodId);
		let totalRating = getallratings.ratings.length;
		let ratingsum = getallratings.ratings
			.map((item) => item.star)
			.reduce((prev, curr) => prev + curr, 0);
		let actualRating = Math.round(ratingsum / totalRating);
		let finalproduct = await Product.findByIdAndUpdate(
			prodId,
			{
				totalrating: actualRating,
			},
			{ new: true }
		);
		res.json(finalproduct);
	} catch (error) {
		throw new Error(error);
	}
});

const getOffers = async (req, res) => {
	try {
		const offers = await Product.find({ newPrice: { $gt: 0 } })
			.populate("category")
			.populate("brand")
			.limit(4);
		return res.status(200).json({ offers });
	} catch (error) {
		console.log("halawatayn");
		console.log(error.message);
		return res.status(500).json({ error: error.message });
	}
};

const test = async (req, res) => {
	try {
		const product = await Product.find({}).populate({
			path: "category",
			match: { title: "إكسسوارات" },
		});
		res.status(200).json({ product });
	} catch (error) {
		console.log("halawatayn");
		console.log(error.message);
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createProduct,
	getaProduct,
	getAllProduct,
	updateProduct,
	deleteProduct,
	addToWishlist,
	rating,
	getOffers,
	getAllProduct1,
	test,
	getaProduct,
	getAllGomla,
};
