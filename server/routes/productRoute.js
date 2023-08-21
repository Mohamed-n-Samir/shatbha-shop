const express = require("express");
const {
	createProduct,
	getaProduct,
	getAllProduct,
	updateProduct,
	deleteProduct,
	addToWishlist,
	getOffers,
	rating,
	getAllProduct1
} = require("./../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/api/createProduct").post(isAdmin, createProduct);
router.route("/api/deleteProduct").delete(isAdmin, deleteProduct);
router.route("/api/getOffers").get(getOffers);
router.route("/api/updateProduct/:id").patch(isAdmin, updateProduct);
router.route("/api/allProduct").get(isAdmin,getAllProduct);
router.route("/api/allProductForUsers").get(getAllProduct1);
router.route("/:id").get(getaProduct);
router.route("/wishlist").put(authMiddleware, addToWishlist);
router.route("/rating").put(authMiddleware, rating);

module.exports = router;
