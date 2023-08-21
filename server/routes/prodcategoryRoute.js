const express = require("express");
const {
	createCategory,
	updateCategory,
	deleteCategory,
	getCategory,
	getallCategory,
} = require("./../controllers/prodcategoryCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/api/createCategory").post(isAdmin, createCategory);
router.route("/api/updateCategory/:id").patch(isAdmin, updateCategory);
router.route("/api/deleteCategory").delete(isAdmin, deleteCategory);
router.route("/:id").get(getCategory);
router.route("/api/allCategory").get(getallCategory);



module.exports = router;
