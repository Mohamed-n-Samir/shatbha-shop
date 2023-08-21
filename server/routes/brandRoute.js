const express = require("express");
const {
	createBrand,
	updateBrand,
	deleteBrand,
	getBrand,
	getallBrand,
} = require("./../controllers/brandCtrl");
const { isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/api/createBrand").post(isAdmin, createBrand);
router.route("/api/updateBrand/:id").patch(isAdmin, updateBrand);
router.route("/api/deleteBrand").delete(isAdmin, deleteBrand);
router.route("/:id").get(getBrand);
router.route("/api/allBrands").get(getallBrand);


module.exports = router;
