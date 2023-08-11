const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const { isUser } = require("./middleware/authMiddleware");



dotenv.config();

// global variables
const PORT = process.env.PORT | 8080;

// MiddleWares
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("dist"));

//cookie parser
app.use(cookieParser());

//routes

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
// app.use("/", require("./routes/userAccess.js"));

// app.get("/:segments*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
// 		if (err) {
// 			res.status(500).send(err);
// 		}
// 	});
// });

//database connection
connectDB();

mongoose.connection.on(
	"error",
	console.error.bind(console, "connection error:")
);

mongoose.connection.on("disconnected", () => {
	console.log("Lost connection to the database. Trying to reconnect...");
});

mongoose.connection.on("connected", () => {
	console.log("Connection to the database established successfully.");
});

mongoose.connection.once("open", () => {
	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}..`);
	});
});
