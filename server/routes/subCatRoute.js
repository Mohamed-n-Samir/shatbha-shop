const express = require("express");
const { getCreateSubCategory,updateSubCategory,getAllSubCategory,getAllData } = require('../controllers/subCategoryCtrl');
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/api/getCreateSubCategory/:id").get(isAdmin, getCreateSubCategory);
router.route("/api/getAllSubCategory").get(isAdmin, getAllSubCategory);
router.route("/api/getAllSubCategoryData").get(getAllData);
router.route("/api/updateSubCategory/:id").patch( updateSubCategory);
// router.route("/api/chart").get(isAdmin, chartData);
// router.route("/:id").delete(authMiddleware, isAdmin, deleteCategory);
// router.route("/:id").get(getCategory);
// router.route("/").get(getallCategory);



module.exports = router;
