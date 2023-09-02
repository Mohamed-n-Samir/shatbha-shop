const User = require("../model/userModel");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");
const Coupon = require("../model/couponModel");
const Order = require("../model/orderModel");
const City = require("../model/shipingCity");
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
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
const login = async (req, res) => {
	const { email, password } = req.body;
	// check if cridentials exists or not
	try {
		if (!email || !password) {
			return res
				.status(401)
				.json({ error: "البريد الاكتروني وكلمة المرور مطلوبين" });
		}
		// check if user exists or not
		const findUser = await User.findOne({ email });
		if (findUser) {
			if (findUser.isBlocked)
				return res.status(401).json({ error: "تم حظر هذا المستخدم" });
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
				maxAge: 192 * 60 * 60 * 1000,
			});
			res.cookie("jwt", generateToken({ _id: findUser?._id }, "60min"), {
				httpOnly: true,
				maxAge: 60 * 60 * 1000,
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
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

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

// Update a user for admin

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
		res.status(500).json({ error: error.message });
	}
};
// Update a for user

const updateUser2 = async (req, res) => {
	const { id } = res.locals;
	const { firstname, lastname, mobile, city, area, buildingAndApartment } =
		req.body;
	validateMongoDbId(id);

	try {
		if (firstname) {
			if (!validateStringlength(firstname, 3, 20))
				return res.status(422).json({
					error: "الاسم الاول يجب ان يكون بين 3 و 20 حرف",
				});
			if (firstname.split(" ").length > 1)
				return res.status(422).json({
					error: "يجب ادخال الاسم الاول فقط",
				});
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ firstname: firstname },
				{
					new: true,
					runValidators: true,
				}
			);
			return res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
		}
		if (lastname) {
			if (!validateStringlength(lastname, 3, 20))
				return res.status(422).json({
					error: "الاسم الاخير يجب ان يكون بين 3 و 20 حرف",
				});
			if (firstname.split(" ").length > 1)
				return res.status(422).json({
					error: "يجب ادخال الاسم الاخير فقط",
				});
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ lastname: lastname },
				{
					new: true,
					runValidators: true,
				}
			);
			return res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
		}
		if (mobile) {
			if (!validateMobile(mobile))
				return res.status(422).json({
					error: "رقم الهاتف يجب ان يكون بين 3 و 20 حرف",
				});
			const mobileFound = await User.findOne({ mobile: mobile });
			if (mobileFound)
				return res.status(409).json({
					error: "رقم الهاتف موجود بالفعل",
				});
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ mobile: mobile },
				{
					new: true,
					runValidators: true,
				}
			);
			return res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
		}
		if (city) {
			if (validateMongoDbId(city)) {
				res.status(422).json({ error: "الرجاء اختيار المدينة" });
			}
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ city: city },
				{
					new: true,
					runValidators: true,
				}
			);
			return res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
		}

		if (area) {
			if (!validateStringlength(area, 3, 20))
				return res.status(422).json({
					error: "المنطقة يجب ان يكون بين 3 و 20 حرف",
				});
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ area: area },
				{
					new: true,
					runValidators: true,
				}
			);
			return res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
		}
		if (buildingAndApartment) {
			if (!validateStringlength(buildingAndApartment, 3, 20))
				return res.status(422).json({
					error: "المنطقة يجب ان يكون بين 3 و 20 حرف",
				});
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ buildingAndApartment: buildingAndApartment },
				{
					new: true,
					runValidators: true,
				}
			);
			return res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
		}

		return res
			.status(422)
			.json({ error: "الرجاء ادخال البيانات المطلوبة" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message });
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

const getUserData = async (req, res) => {
	const { id } = res.locals;

	try {
		console.log(id);
		const getaUser = await User.findById(id).populate("city");
		res.status(200).json({
			user: {
				_id: getaUser?._id,
				firstname: getaUser?.firstname,
				lastname: getaUser?.lastname,
				email: getaUser?.email,
				mobile: getaUser?.mobile,
				role: getaUser?.role,
				city: getaUser?.city,
				area: getaUser?.area,
				buildingAndApartment: getaUser?.buildingAndApartment,
				gender: getaUser?.gender,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const blockUser = async (req, res) => {
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
		res.status(200).json({ message: "تم حظر المستخدم بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const unblockUser = async (req, res) => {
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
		res.status(200).json({ message: "تم الغاء حظر المستخدم بنجاح" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updatePassword = async (req, res) => {
	console.log("halalalalalalal");
	const { id } = res.locals;
	const { oldPassword, newPassword } = req.body;
	console.log(req.body);
	try {
		validateMongoDbId(id);
		if (!oldPassword || oldPassword?.length === 0)
			return res.status(401).json({
				error: "كلمة المرور القديمة مطلوبة",
			});
		const user = await User.findById(id);
		if (!(await user.isPasswordMatched(oldPassword)))
			return res.status(401).json({
				error: "كلمة المرور القديمة غير صحيحة",
			});
		if (oldPassword === newPassword)
			return res.status(401).json({
				error: "كلمة المرور الجديدة يجب ان تكون مختلفة عن كلمة المرور القديمة",
			});
		if (newPassword.length < 8)
			return res.status(401).json({
				error: "كلمة المرور يجب ان تكون اكثر من 8 احرف",
			});
		user.password = newPassword;
		await user.save();
		res.status(200).json({
			message: "تم تغيير كلمة المرور بنجاح",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

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

const getWishlist = async (req, res) => {
	const { id } = res.locals;
	try {
		const findUser = await User.findById(id)
			.populate("wishlist")
			.select("wishlist");
		res.status(200).json(findUser);
	} catch (error) {
		res.status(200).json({ error: error.message });
	}
};

const addToWishlist = async (req, res) => {
	const { id } = res.locals;
	const { productId } = req.body;
	validateMongoDbId(_id);
	try {
		const getWishlist = await User.findByIdAndUpdate(
			_id,
			{
				$addToSet: { wishlist: productId },
			},
			{
				new: true,
			}
		);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

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

const createOrder = async (req, res) => {
	const { products, city, area, buildingAndApartment, notes } =
		await req.body;
	const { id } = res.locals;
	validateMongoDbId(id);
	let cartTotal = 0;
	let address;
	let shippingPrice = 0;
	if (!products || products.length === 0) {
		res.status(400).json({ error: "لا يوجد منتجات في السله" });
	}
	if (!city || city?.length === 0 || !area || area?.length === 0) {
		const { city, area, buildingAndApartment } = await User.findById(id)
			.populate("city")
			.select("city area buildingAndApartment");
		address = `${city?.name}/${area}/${buildingAndApartment}`;
		shippingPrice = city?.shippingCharge;
		console.log(address);
	} else {
		const city = await City.find({ _id: city }).select("name");
		address = `${city?.name}/${area}/${buildingAndApartment}`;
		console.log(address);
	}

	try {
		for (let i = 0; i < products.length; i++) {
			const price = await Product.findOne({
				product: products[i]._id,
			}).select("newPrice");
			console.log(price.newPrice);
			cartTotal =
				cartTotal +
				shippingPrice +
				price.newPrice * products[i].quantity;
		}
		let newOrder = await new Order({
			products: products,
			paymentIntent: {
				id: uniqid(),
				method: "COD",
				amount: cartTotal,
				created: Date.now(),
				currency: "EGP",
			},
			orderby: id,
			orderStatus: "Not Processed",
			destinationAddress: address,
			notes,
		}).save();
		res.status(200).json({
			message: "تم تنفيذ الطلب بنجاح",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// const createOrderVisa = async (req, res) => {
// 	const { products, city, area, buildingAndApartment, notes } =
// 		await req.body;
// 	const { id } = res.locals;
// 	validateMongoDbId(id);
// 	let cartTotal = 0;
// 	let address;
// 	if (!products || products.length === 0) {
// 		res.status(400).json({ error: "لا يوجد منتجات في السله" });
// 	}
// 	if (!city || city?.length === 0 || !area || area?.length === 0) {
// 		const { city, area, buildingAndApartment } = await User.findById(id)
// 			.populate("city")
// 			.select("city area buildingAndApartment");
// 		address = `${city?.name}/${area}/${buildingAndApartment}`;
// 		console.log(address);
// 	} else {
// 		const city = await City.find({ _id: city }).select("name");
// 		address = `${city?.name}/${area}/${buildingAndApartment}`;
// 		console.log(address);
// 	}

// 	try {
// 		if (!products || products.length === 0) {
// 			return res.status(400).json({ error: "لا يوجد منتجات في السله" });
// 		}
// 		let stripeProductData = [];

// 		products?.map(async (product,i) => {
// 			const prod = await Product.findOne({
// 				_id: product._id,
// 			}).select("newPrice title");
// 			console.log(prod.newPrice, prod.title);
// 			cartTotal = cartTotal + prod.newPrice * product.quantity;
// 			stripeProductData.push({
// 				price_data: {
// 					currency: "EGP",
// 					product_data: {
// 						name: product.title,
// 					},
// 					unit_amount: product.newPrice * 100,
// 				},
// 				quantity: product.quantity,
// 			});
// 		});

// 		const session = await stripe.checkout.sessions.create({
// 			payment_method_types: ["card"],
// 			mode: "payment",
// 			line_items: stripeProductData,
// 			success_url: `${process.env.CLIENT_URL}/success`,
// 			cancel_url: `${process.env.CLIENT_URL}/cancel`,
// 		});
// 		let newOrder = await new Order({
// 			products: products,
// 			paymentIntent: {
// 				id: uniqid(),
// 				method: "COD",
// 				amount: cartTotal,
// 				status: "Cash on Delivery",
// 				created: Date.now(),
// 				currency: "EGP",
// 			},
// 			orderby: id,
// 			orderStatus: "Cash on Delivery",
// 			destinationAddress: address,
// 			notes,
// 		}).save();
// 		res.status(200).json({
// 			message: "تم تنفيذ الطلب بنجاح",
// 		});
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

const getOrders = async (req, res) => {
	const { id } = res.locals;
	validateMongoDbId(id);
	console.log(id);
	try {
		const userOrders = await Order.find({ orderby: id })
			.populate("products.product")
			.populate("orderby")
			.sort({ createdAt: -1 })
			.exec();
		res.status(200).json({ userOrders });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllOrders = async (req, res) => {
	try {
		const alluserorders = await Order.find()
			.populate("products.product")
			.populate("orderby")
			.sort({ createdAt: -1 });

		console.log(alluserorders);
		res.status(200).json({ alluserorders });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateOrder = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	validateMongoDbId(id);
	try {
		if (!data || data === {}) {
			return res.status(422).json({ error: "الرجاء ادخال البيانات" });
		}
		const updateOrder = await Order.findByIdAndUpdate(id, data, {
			new: true,
		});
		return res.status(200).json({ message: "تم تحديث البيانات بنجاح" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

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
const updateOrderStatus = async (req, res) => {
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
		res.status(200).json({ updateOrderStatus });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createUser,
	login,
	getallUser,
	getallAdmins,
	getaUser,
	updateUser2,
	updateUser,
	blockUser,
	unblockUser,
	handleRefreshToken,
	logout,
	updatePassword,
	resetPassword,
	updateOrder,
	getWishlist,
	addToWishlist,
	saveAddress,
	userCart,
	getUserCart,
	emptyCart,
	applyCoupon,
	createOrder,
	// createOrderVisa,
	getOrders,
	updateOrderStatus,
	getAllOrders,
	getOrderByUserId,
	getUserData,
	createAdmin,
};
