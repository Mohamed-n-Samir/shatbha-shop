const express = require("express");
const {
	createUser,
	login,
	getallUser,
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
	addToWishlist,
	saveAddress,
	userCart,
	getUserCart,
	emptyCart,
	applyCoupon,
	createOrder,
	getOrders,
	updateOrderStatus,
	getAllOrders,
	getUserData,
	createAdmin,
	getallAdmins
} = require("./../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/api/register").post(createUser); 
router.route("/api/createAdmin").post(isAdmin,createAdmin); 
router.route("/api/getUserData").get(authMiddleware,getUserData);
router.route("/api/allUsers").get(isAdmin, getallUser);
router.route("/api/allAdmins").get(isAdmin, getallAdmins);
router.route("/api/updateUser-admin/:id").patch(updateUser);
router.route("/api/createOrder").post(authMiddleware, createOrder);

router.route("/password/:token").put(authMiddleware, updatePassword);
router.route("/password").put(authMiddleware, updatePassword);
router.route("/api/login").post(login);
router.route("/api/wishlist").get(authMiddleware, getWishlist);
router.route("/api/wishlist").post(authMiddleware, addToWishlist);
router.route("/cart").post(authMiddleware, userCart);
router.route("/cart/applycoupon").post(authMiddleware, applyCoupon);
router.route("/get-orders").get(authMiddleware, getOrders);
router.route("/getallorders").get(authMiddleware, isAdmin, getAllOrders);
router.route("/getorderbyuser/:id").post(authMiddleware, isAdmin, getAllOrders);
router.route("/refresh").get(handleRefreshToken);
router.route("/api/logout").delete(logout);
router.route("/cart").get(authMiddleware, getUserCart);
router.route("/:id").get(authMiddleware, isAdmin, getaUser);
router.route("/empty-cart").delete(authMiddleware, emptyCart);
router.route("/:id").delete(deleteaUser);
router.route("/save-address").put(authMiddleware, saveAddress);
router.route("/block-user/:id").put(authMiddleware, isAdmin, blockUser);
router.route("/unblock-user/:id").put(authMiddleware, isAdmin, unblockUser);

module.exports = router;
