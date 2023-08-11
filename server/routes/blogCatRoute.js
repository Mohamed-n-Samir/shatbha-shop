const express = require("express");
const {
	createCategory,
	updateCategory,
	deleteCategory,
	getCategory,
	getallCategory,
} = require("./../controllers/blogCatCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/").post(authMiddleware, isAdmin, createCategory);
router.route("/:id").put(authMiddleware, isAdmin, updateCategory);
router.route("/:id").delete(authMiddleware, isAdmin, deleteCategory);
router.route("/:id").get(getCategory);
router.route("/").get(getallCategory);



module.exports = router;
