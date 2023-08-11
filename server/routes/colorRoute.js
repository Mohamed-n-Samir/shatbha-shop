const express = require("express");
const {
	createColor,
	updateColor,
	deleteColor,
	getColor,
	getallColor,
} = require("./../controllers/colorCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/").post(authMiddleware, isAdmin, createColor);
router.route("/:id").put(authMiddleware, isAdmin, updateColor);
router.route("/:id").delete(authMiddleware, isAdmin, deleteColor);
router.route("/:id").get(getColor);
router.route("/").get(getallColor);


module.exports = router;
