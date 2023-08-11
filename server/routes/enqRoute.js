const express = require("express");
const {
	createEnquiry,
	updateEnquiry,
	deleteEnquiry,
	getEnquiry,
	getallEnquiry,
} = require("./../controllers/enqCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(createEnquiry);
router.route("/:id").put(authMiddleware, isAdmin, updateEnquiry);
router.route("/:id").delete(authMiddleware, isAdmin, deleteEnquiry);
router.route("/:id").get(getEnquiry);
router.route("/").get(getallEnquiry);

module.exports = router;
