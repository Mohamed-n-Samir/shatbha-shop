const express = require("express");
const {
	createCoupon,
	getAllCoupons,
	updateCoupon,
	deleteCoupon,
} = require("./../controllers/couponCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(authMiddleware, isAdmin, createCoupon);
router.route("/:id").put(authMiddleware, isAdmin, updateCoupon);
router.route("/:id").delete(authMiddleware, isAdmin, deleteCoupon);
router.route("/:id").get(getAllCoupons);
router.route("/").get(getAllCoupons);


module.exports = router;
