const express = require("express");
const {
	createBrand,
	updateBrand,
	deleteBrand,
	getBrand,
	getallBrand,
} = require("./../controllers/brandCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(authMiddleware, isAdmin, createBrand);
router.route("/:id").put(authMiddleware, isAdmin, updateBrand);
router.route("/:id").delete(authMiddleware, isAdmin, deleteBrand);
router.route("/:id").get(getBrand);
router.route("/").get(getallBrand);


module.exports = router;
