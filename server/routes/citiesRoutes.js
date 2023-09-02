const express = require("express");
const { addCity, getCities,updateCity,deleteCity } = require("./../controllers/shipingCityCtrl");
const {isAdmin} = require("./../middleware/authMiddleware");

const router = express.Router();

router.route("/api/getAllCities").get(getCities);
router.route("/api/addCity").post(isAdmin,addCity);
router.route("/api/updateCity/:id").patch(isAdmin,updateCity);
router.route("/api/deleteCity").delete(isAdmin,deleteCity);

module.exports = router;
