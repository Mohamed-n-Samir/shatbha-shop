const express = require("express");
const {
	createProduct,
	getAllProduct,
	updateProduct,
	deleteProduct,
	addToWishlist,
	getOffers,
	rating,
	getAllProduct1,
	test,
	getaProduct
} = require("./../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/api/createProduct").post(isAdmin, createProduct);
router.route("/api/deleteProduct").delete(isAdmin, deleteProduct);
router.route("/api/getOffers").get(getOffers);
router.route("/api/getaProduct/:slug").get(getaProduct);
router.route("/api/updateProduct/:id").patch(isAdmin, updateProduct);
router.route("/api/allProduct").get(isAdmin,getAllProduct);
router.route("/api/allProductForUsers").get(getAllProduct1);
router.route("/wishlist").put(authMiddleware, addToWishlist);
router.route("/rating").put(authMiddleware, rating);

router.route("/api/test").get(test);

module.exports = router;
