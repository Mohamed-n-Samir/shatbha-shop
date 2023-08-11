const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { generateRefreshToken } = require("../helpers/tokens");
const { handleRefreshToken } = require("../controllers/userCtrl");

const authMiddleware = (req, res, next) => {
	const token = req.cookies.jwt;
	const refToken = req.cookies.refToken;
	// check json web token exists & is verified
	if (token) {
		jwt.verify(
			token,
			process.env.TOKEN_SECRET,
			async (err, decodedToken) => {
				if (err && err.name === "TokenExpiredError") {
					console.log("halawa2");
					handleRefreshToken(req, res, next);
				} else if (err) {
					res.status(401).json({ message: "Unauthorized" });
					// res.redirect("/login");
				} else {
					res.locals.id = decodedToken._id;
					const user = await User.findById(res.locals.id);
					if (
						user &&
						(user.role === "user" || user.role === "admin")
					) {
						next();
					} else {
						res.status(401).json({
							message: "Unauthorized",
							success: false,
						});
						// res.redirect("/login");
					}
				}
			}
		);
	} else if (refToken) {
		handleRefreshToken(req, res, next);
	} else {
		res.json({ error: "no tokens" });
		// res.redirect("/login");
	}
};

const isAdmin = (req, res, next) => {
	const token = req.cookies.jwt;
	const refToken = req.cookies.refToken;
	// check json web token exists & is verified
	if (token) {
		jwt.verify(
			token,
			process.env.TOKEN_SECRET,
			async (err, decodedToken) => {
				if (err && err.name === "TokenExpiredError") {
					console.log("halawa2");
					handleRefreshToken(req, res, next);
				} else if (err) {
					res.status(401).json({ message: "Unauthorized" });
					// res.redirect("/login");
				} else {
					res.locals.id = decodedToken._id;
					const user = await User.findById(res.locals.id);
					if (user && user.role === "admin") {
						next();
					} else {
						res.status(401).json({
							message: "Unauthorized",
							success: false,
						});
						// res.redirect("/login");
					}
				}
			}
		);
	} else if (refToken) {
		handleRefreshToken(req, res, next);
	} else {
		res.json({ error: "no tokens" });
		// res.redirect("/login");
	}
};

module.exports = { authMiddleware, isAdmin };
