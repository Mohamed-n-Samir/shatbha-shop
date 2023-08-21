const City = require("../model/shipingCity");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../helpers/validateMongodbId");

const addCity = asyncHandler(async (req, res) => {
    const {name, shippingCharge} = req.body;
	try {
        if(!name) throw new Error("City Name is required");
        if(name.length < 3) throw new Error("City Name must be at least 3 characters long");
        if(!shippingCharge && shippingCharge!== 0) throw new Error("Shipping Charge is required");
        if(shippingCharge < 0) throw new Error("Shipping Charge must be greater or equal to 0");
		const newCity = await new City({
            name,
            shippingCharge
        }).save();
		res.status(200).json(newCity);
	} catch (error) {
		throw new Error(error);
	}
});

const getCities = asyncHandler(async (req, res) => {
	try {
		const getCities = await City.find();
		res.json(getCities);
	} catch (error) {
		throw new Error(error);
	}
});







const updateColor = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updatedColor);
	} catch (error) {
		throw new Error(error);
	}
});
const deleteColor = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const deletedColor = await Color.findByIdAndDelete(id);
		res.json(deletedColor);
	} catch (error) {
		throw new Error(error);
	}
});

const getallColor = asyncHandler(async (req, res) => {
	try {
		const getallColor = await Color.find();
		res.json(getallColor);
	} catch (error) {
		throw new Error(error);
	}
});
module.exports = {
    addCity,
	getCities
};
