const express = require("express");
const {
	createUser,
	login,
	getallUser,
	getaUser,
	updateUser,
	updateUser2,
	blockUser,
	unblockUser,
	handleRefreshToken,
	logout,
	updatePassword,
	resetPassword,
	getWishlist,
	addToWishlist,
	saveAddress,
	userCart,
	getUserCart,
	emptyCart,
	applyCoupon,
	createOrder,
	// createOrderVisa,
	updateOrder,
	getOrders,
	updateOrderStatus,
	getAllOrders,
	getUserData,
	createAdmin,
	getallAdmins,
} = require("./../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/api/register").post(createUser);
router.route("/api/createAdmin").post(isAdmin, createAdmin);
router.route("/api/getUserData").get(authMiddleware, getUserData);
router.route("/api/allUsers").get(isAdmin, getallUser);
router.route("/api/allAdmins").get(isAdmin, getallAdmins);
router.route("/api/updateUser-admin/:id").patch(isAdmin, updateUser);
router.route("/api/updateUser-user").patch(authMiddleware, updateUser2);
router.route("/api/createOrder").post(authMiddleware, createOrder);
// router.route("/api/createOrderVisa").post(authMiddleware, createOrderVisa);
router.route("/api/getOrders").get(authMiddleware, getOrders);
router.route("/api/passwordChange").put(authMiddleware, updatePassword);
router.route("/api/block-user/:id").put(isAdmin, blockUser);
router.route("/api/unblock-user/:id").put(isAdmin, unblockUser);
router.route("/api/getallorders").get(isAdmin, getAllOrders);
router.route("/api/updateOrder/:id").patch(isAdmin, updateOrder);


router.route("/password").put(authMiddleware, updatePassword);
router.route("/api/login").post(login);
router.route("/api/wishlist").get(authMiddleware, getWishlist);
router.route("/api/wishlist").post(authMiddleware, addToWishlist);
router.route("/cart").post(authMiddleware, userCart);
router.route("/cart/applycoupon").post(authMiddleware, applyCoupon);
router.route("/getorderbyuser/:id").post(authMiddleware, isAdmin, getAllOrders);
router.route("/refresh").get(handleRefreshToken);
router.route("/api/logout").delete(logout);
router.route("/cart").get(authMiddleware, getUserCart);
router.route("/:id").get(authMiddleware, isAdmin, getaUser);
router.route("/empty-cart").delete(authMiddleware, emptyCart);
router.route("/save-address").put(authMiddleware, saveAddress);

module.exports = router;
