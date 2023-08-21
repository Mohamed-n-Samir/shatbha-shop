const User = require("../model/userModel");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");
const Coupon = require("../model/couponModel");
const Order = require("../model/orderModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../helpers/tokens");
const validateMongoDbId = require("../helpers/validateMongodbId");
const { generateRefreshToken } = require("../helpers/tokens");
const {
	validateEmail,
	validateStringlength,
	validateMobile,
} = require("../helpers/validation");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
	try {
		const {
			firstname,
			lastname,
			email,
			mobile,
			password,
			city,
			area,
			buildingAndApartment,
			gender,
		} = await req.body;

		if (!validateEmail(email))
			return res
				.status(422)
				.json({ error: "البريد الاكتروني مطلوب او خاطئ" });
		const checkedEmail = await User.findOne({ email: email.toLowerCase() });

		if (checkedEmail)
			return res
				.status(409)
				.json({ error: "البريد الاكتروني موجود بالفعل" });

		if (!validateMobile(mobile))
			return res.status(422).json({ error: "رقم الهاتف مطلوب او خاطئ" });

		const checkedMobile = await User.findOne({ mobile: mobile });

		if (checkedMobile)
			return res.status(409).json({ error: "رقم الهاتف موجود بالفعل" });

		if (!validateStringlength(firstname, 3, 20))
			return res.status(422).json({
				error: "firstname must be between 3 and 20 characters",
			});

		if (!validateStringlength(lastname, 3, 20))
			return res.status(422).json({
				error: "lastname must be between 3 and 20 characters",
			});

		if (!validateStringlength(password, 8, 32))
			return res.status(422).json({
				error: "password must be between 6 and 20 characters",
			});

		if (!validateStringlength(buildingAndApartment, 3, 60))
			return res.status(422).json({
				error: "building And Apartment must be between 3 and 60 characters",
			});

		if (!validateStringlength(area, 3, 20))
			return res
				.status(422)
				.json({ error: "area must be between 3 and 20 characters" });

		if (!validateStringlength(city, 3, 30))
			return res.status(422).json({ error: "city is Required" });

		if (!["Male", "Female"].includes(gender))
			return res.status(422).json({ error: "gender is required" });

		const user = await new User({
			firstname,
			lastname,
			email: email.toLowerCase(),
			password,
			mobile,
			gender,
			city,
			area,
			buildingAndApartment,
		}).save();
		res.status(200).json({
			message: "Register Success ! login now",
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

const createAdmin = async (req, res) => {
	try {
		const { firstname, lastname, email, mobile, password, gender } =
			await req.body;

		if (!validateEmail(email))
			return res
				.status(422)
				.json({ error: "البريد الاكتروني مطلوب او خاطئ" });
		const checkedEmail = await User.findOne({ email: email.toLowerCase() });

		if (checkedEmail)
			return res
				.status(409)
				.json({ error: "البريد الاكتروني موجود بالفعل" });

		if (!validateMobile(mobile))
			return res.status(422).json({ error: "رقم الهاتف مطلوب او خاطئ" });

		const checkedMobile = await User.findOne({ mobile: mobile });

		if (checkedMobile)
			return res.status(409).json({ error: "رقم الهاتف موجود بالفعل" });

		if (!validateStringlength(firstname, 3, 20))
			return res.status(422).json({
				error: "firstname must be between 3 and 20 characters",
			});

		if (!validateStringlength(lastname, 3, 20))
			return res.status(422).json({
				error: "lastname must be between 3 and 20 characters",
			});

		if (!validateStringlength(password, 8, 32))
			return res.status(422).json({
				error: "password must be between 6 and 20 characters",
			});

		if (!["Male", "Female"].includes(gender))
			return res.status(422).json({ error: "gender is required" });

		const user = await new User({
			firstname,
			lastname,
			email: email.toLowerCase(),
			password,
			mobile,
			gender,
			city: "64d6c066ba4241ab93a23f48",
			area: "admin area",
			buildingAndApartment: "admin Building and Apartment",
			role: "admin",
		}).save();
		res.status(200).json({
			message: "admin created successfully",
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Login a user
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	// check if cridentials exists or not
	if (!email || !password) {
		return res
			.status(401)
			.json({ error: "البريد الاكتروني وكلمة المرور مطلوبين" });
	}
	// check if user exists or not
	const findUser = await User.findOne({ email });
	if (findUser) {
		if (!(await findUser.isPasswordMatched(password))) {
			return res.status(401).json({ error: "كلمة المرور غير صحيحة" });
		}
		const refreshToken = await generateRefreshToken(findUser?._id);
		const updateuser = await User.findByIdAndUpdate(
			findUser.id,
			{
				refreshToken: refreshToken,
			},
			{ new: true }
		);
		res.cookie("refToken", refreshToken, {
			httpOnly: true,
		});
		res.cookie("jwt", generateToken({ _id: findUser?._id }, "30min"), {
			httpOnly: true,
		});

		return res.status(200).json({
			message: "تم تسجيل الدخول بنجاح",
			user: {
				_id: findUser._id,
				firstname: findUser.firstname,
				lastname: findUser.lastname,
				email: findUser.email,
				mobile: findUser.mobile,
				role: findUser?.role,
			},
		});
	} else {
		return res.status(401).json({ error: "البريد الاكتروني غير صحيح" });
	}
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	// check if user exists or not
	const findAdmin = await User.findOne({ email });
	if (findAdmin.role !== "admin") throw new Error("Not Authorised");
	if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
		const refreshToken = await generateRefreshToken(findAdmin?._id);
		const updateuser = await User.findByIdAndUpdate(
			findAdmin.id,
			{
				refreshToken: refreshToken,
			},
			{ new: true }
		);
		res.cookie("refToken", refreshToken, {
			httpOnly: true,
			maxAge: 72 * 60 * 60 * 1000,
		});
		res.json({
			_id: findAdmin?._id,
			firstname: findAdmin?.firstname,
			lastname: findAdmin?.lastname,
			email: findAdmin?.email,
			mobile: findAdmin?.mobile,
			token: generateToken(findAdmin?._id),
		});
	} else {
		throw new Error("Invalid Credentials");
	}
});

// handle refresh token

const handleRefreshToken = async (req, res, next) => {
	const cookie = req.cookies;
	if (!cookie?.refToken) return res.json({ error: "no token" });
	const refreshToken = cookie.refToken;
	const user = await User.findOne({ refreshToken });
	console.log(user);
	if (!user)
		return res.status(401).json({
			error: "no refresh token found",
		});
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN,
		async (err, decoded) => {
			console.log(decoded?._id);
			if (err || user?._id.toString() !== decoded?._id) {
				console.log("halaw1");
				console.log(err);
				console.log(decoded);
				console.log(user?._id.toString());

				return res.status(401).json({
					error: err,
				});
			}
			res.cookie("jwt", generateToken({ _id: decoded?._id }, "30m"), {
				httpOnly: true,
				maxAge: 72 * 60 * 60 * 1000,
			});
			res.locals.id = decoded?._id;
			const user2 = await User.findById(res.locals.id);
			if (user2 && (user2.role === "user" || user2.role === "admin")) {
				next();
			} else {
				return res.status(401).json({
					message: "Unauthorized",
					success: false,
				});
			}
		}
	);
};

// logout functionality

const logout = asyncHandler(async (req, res) => {
	const cookie = req.cookies;
	if (cookie?.refToken) {
		const refreshToken = cookie.refToken;
		const user = await User.findOne({ refreshToken });
		if (!user) {
			res.clearCookie("refToken", {
				httpOnly: true,
				// secure: true,
			});
			res.clearCookie("jwt", {
				httpOnly: true,
				// secure: true,
			});
			console.log("halawaaaaa");
			return res.sendStatus(204); // forbidden
		}
		await User.findOneAndUpdate(
			{ refreshToken },
			{
				refreshToken: "",
			}
		);
		res.clearCookie("refToken", {
			httpOnly: true,
			// secure: true,
		});
		res.clearCookie("jwt", {
			httpOnly: true,
			// secure: true,
		});
		console.log("halawaaaaa 2");

		return res.status(200).json({
			message: "تم تسجيل الخروج بنجاح",
		}); // forbidden
	} else if (cookie?.jwt) {
		res.clearCookie("jwt", {
			httpOnly: true,
			// secure: true,
		});
		console.log("halawaaaaa 3");

		return res.status(200).json({
			message: "تم تسجيل الخروج بنجاح",
		}); // forbidden
	}
});

// Update a user

const updateUser = async (req, res) => {
	const _id = req.params.id;
	const data = req.body;
	console.log(data);
	validateMongoDbId(_id);

	try {
		const updatedUser = await User.findByIdAndUpdate(_id, data, {
			new: true,
			runValidators: true,
		});
		console.log(updatedUser);
		res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message});
	}
};

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
	const { _id } = req.user;
	validateMongoDbId(_id);

	try {
		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{
				address: req?.body?.address,
			},
			{
				new: true,
			}
		);
		res.json(updatedUser);
	} catch (error) {
		throw new Error(error);
	}
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
	try {
		const allUsers = await User.find({
			role: "user",
		}).populate("city");
		res.status(200).json({ allUsers });
	} catch (error) {
		throw new Error(error);
	}
});
// Get all admins

const getallAdmins = asyncHandler(async (req, res) => {
	try {
		const allAdmins = await User.find({
			role: "admin",
		}).populate("city");
		res.status(200).json({ allAdmins });
	} catch (error) {
		throw new Error(error);
	}
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);

	try {
		const getaUser = await User.findById(id)
			.populate("wishlist")
			.populate("cart")
			.populate("orders");
		res.json({
			getaUser,
		});
	} catch (error) {
		throw new Error(error);
	}
});

const getUserData = asyncHandler(async (req, res) => {
	console.log("halawa3");
	const { id } = res.locals;
	// validateMongoDbId(id);

	try {
		console.log("halawa4");
		console.log(id);
		const getaUser = await User.findById(id);
		res.json({
			user: {
				_id: getaUser?._id,
				firstname: getaUser?.firstname,
				lastname: getaUser?.lastname,
				email: getaUser?.email,
				mobile: getaUser?.mobile,
				role: getaUser?.role,
			},
		});
	} catch (error) {
		throw new Error(error);
	}
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);

	try {
		const deleteaUser = await User.findByIdAndDelete(id);
		res.json({
			deleteaUser,
		});
	} catch (error) {
		throw new Error(error);
	}
});

const blockUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);

	try {
		const blockusr = await User.findByIdAndUpdate(
			id,
			{
				isBlocked: true,
			},
			{
				new: true,
			}
		);
		res.json(blockusr);
	} catch (error) {
		throw new Error(error);
	}
});

const unblockUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);

	try {
		const unblock = await User.findByIdAndUpdate(
			id,
			{
				isBlocked: false,
			},
			{
				new: true,
			}
		);
		res.json({
			message: "User UnBlocked",
		});
	} catch (error) {
		throw new Error(error);
	}
});

const updatePassword = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { password } = req.body;
	validateMongoDbId(_id);
	const user = await User.findById(_id);
	if (password) {
		user.password = password;
		const updatedPassword = await user.save();
		res.json(updatedPassword);
	} else {
		res.json(user);
	}
});

const resetPassword = asyncHandler(async (req, res) => {
	const { password } = req.body;
	const { token } = req.params;
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) throw new Error(" Token Expired, Please try again later");
	user.password = password;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();
	res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	try {
		const findUser = await User.findById(_id).populate("wishlist");
		res.json(findUser);
	} catch (error) {
		throw new Error(error);
	}
});

const userCart = asyncHandler(async (req, res) => {
	const { cart } = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		let products = [];
		const user = await User.findById(_id);
		// check if user already have product in cart
		const alreadyExistCart = await Cart.findOne({ orderby: user._id });
		if (alreadyExistCart) {
			alreadyExistCart.remove();
		}
		for (let i = 0; i < cart.length; i++) {
			let object = {};
			object.product = cart[i]._id;
			object.count = cart[i].count;
			object.color = cart[i].color;
			let getPrice = await Product.findById(cart[i]._id)
				.select("price")
				.exec();
			object.price = getPrice.price;
			products.push(object);
		}
		let cartTotal = 0;
		for (let i = 0; i < products.length; i++) {
			cartTotal = cartTotal + products[i].price * products[i].count;
		}
		let newCart = await new Cart({
			products,
			cartTotal,
			orderby: user?._id,
		}).save();
		res.json(newCart);
	} catch (error) {
		throw new Error(error);
	}
});

const getUserCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const cart = await Cart.findOne({ orderby: _id }).populate(
			"products.product"
		);
		res.json(cart);
	} catch (error) {
		throw new Error(error);
	}
});

const emptyCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const user = await User.findOne({ _id });
		const cart = await Cart.findOneAndRemove({ orderby: user._id });
		res.json(cart);
	} catch (error) {
		throw new Error(error);
	}
});

const applyCoupon = asyncHandler(async (req, res) => {
	const { coupon } = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	const validCoupon = await Coupon.findOne({ name: coupon });
	if (validCoupon === null) {
		throw new Error("Invalid Coupon");
	}
	const user = await User.findOne({ _id });
	let { cartTotal } = await Cart.findOne({
		orderby: user._id,
	}).populate("products.product");
	let totalAfterDiscount = (
		cartTotal -
		(cartTotal * validCoupon.discount) / 100
	).toFixed(2);
	await Cart.findOneAndUpdate(
		{ orderby: user._id },
		{ totalAfterDiscount },
		{ new: true }
	);
	res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
	const { COD, couponApplied } = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		if (!COD) throw new Error("Create cash order failed");
		const user = await User.findById(_id);
		let userCart = await Cart.findOne({ orderby: user._id });
		let finalAmout = 0;
		if (couponApplied && userCart.totalAfterDiscount) {
			finalAmout = userCart.totalAfterDiscount;
		} else {
			finalAmout = userCart.cartTotal;
		}

		let newOrder = await new Order({
			products: userCart.products,
			paymentIntent: {
				id: uniqid(),
				method: "COD",
				amount: finalAmout,
				status: "Cash on Delivery",
				created: Date.now(),
				currency: "EGP",
			},
			orderby: user._id,
			orderStatus: "Cash on Delivery",
		}).save();
		let update = userCart.products.map((item) => {
			return {
				updateOne: {
					filter: { _id: item.product._id },
					update: {
						$inc: { quantity: -item.count, sold: +item.count },
					},
				},
			};
		});
		const updated = await Product.bulkWrite(update, {});
		res.json({ message: "success" });
	} catch (error) {
		throw new Error(error);
	}
});

const getOrders = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const userorders = await Order.findOne({ orderby: _id })
			.populate("products.product")
			.populate("orderby")
			.exec();
		res.json(userorders);
	} catch (error) {
		throw new Error(error);
	}
});

const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const alluserorders = await Order.find()
			.populate("products.product")
			.populate("orderby")
			.exec();
		res.json(alluserorders);
	} catch (error) {
		throw new Error(error);
	}
});
const getOrderByUserId = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const userorders = await Order.findOne({ orderby: id })
			.populate("products.product")
			.populate("orderby")
			.exec();
		res.json(userorders);
	} catch (error) {
		throw new Error(error);
	}
});
const updateOrderStatus = asyncHandler(async (req, res) => {
	const { status } = req.body;
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const updateOrderStatus = await Order.findByIdAndUpdate(
			id,
			{
				orderStatus: status,
				paymentIntent: {
					status: status,
				},
			},
			{ new: true }
		);
		res.json(updateOrderStatus);
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {
	createUser,
	login,
	getallUser,
	getallAdmins,
	getaUser,
	deleteaUser,
	updateUser,
	blockUser,
	unblockUser,
	handleRefreshToken,
	logout,
	updatePassword,
	resetPassword,
	loginAdmin,
	getWishlist,
	saveAddress,
	userCart,
	getUserCart,
	emptyCart,
	applyCoupon,
	createOrder,
	getOrders,
	updateOrderStatus,
	getAllOrders,
	getOrderByUserId,
	getUserData,
	createAdmin,
};
