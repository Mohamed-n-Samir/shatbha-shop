const express = require("express");
const {
    allIncomes,
    chartData

} = require("./../controllers/analCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/api/featured").get(isAdmin, allIncomes);
router.route("/api/chart").get(isAdmin, chartData);
// router.route("/:id").put(authMiddleware, isAdmin, updateCategory);
// router.route("/:id").delete(authMiddleware, isAdmin, deleteCategory);
// router.route("/:id").get(getCategory);
// router.route("/").get(getallCategory);



module.exports = router;
