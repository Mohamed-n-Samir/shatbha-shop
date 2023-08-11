const express = require("express");
const {
	createProduct,
	getaProduct,
	getAllProduct,
	updateProduct,
	deleteProduct,
	addToWishlist,
	rating,
} = require("./../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/").post(authMiddleware, isAdmin, createProduct);
router.route("/:id").put(authMiddleware, isAdmin, updateProduct);
router.route("/:id").delete(authMiddleware, isAdmin, deleteProduct);
router.route("/:id").get(getaProduct);
router.route("/").get(getAllProduct);
router.route("/wishlist").put(authMiddleware, addToWishlist);
router.route("/rating").put(authMiddleware, rating);

module.exports = router;
