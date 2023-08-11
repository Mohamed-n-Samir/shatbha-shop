const express = require("express");
const { addCity, getCities } = require("./../controllers/shipingCityCtrl");

const router = express.Router();

router.route("/api/getAllCities").get(getCities);
router.route("/api/addCity").post(addCity);

module.exports = router;
