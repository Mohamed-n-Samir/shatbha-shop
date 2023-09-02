const jwt = require("jsonwebtoken");

const generateToken = (payload, expired) => {
	return jwt.sign(payload, process.env.TOKEN_SECRET, {
		expiresIn: expired,
	});
};

const generateRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.REFRESH_TOKEN,{
	expiresIn: "8d",
  });
};



module.exports = { generateToken, generateRefreshToken}