const User = require("../model/userModel");

const validateEmail = (email) => {
	console.log(email)
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const validateNumberlength = (number, min, max) => {
	if (number < min || number > max) {
		return false;
	} else {
		return true;
	}
};

const validateMobile = (mobileNumber) => {
	const regex = /^01[0125][0-9]{8}$/gm;

	if (regex.test(mobileNumber)) {
		return true;
	}

	return false;
};

const validateStringlength = (text, min, max) => {
	if (text.length < min || text.length > max) {
		return false;
	} else {
		return true;
	}
};

module.exports = {
	validateEmail,
	validateStringlength,
	validateNumberlength,
	validateMobile
};
