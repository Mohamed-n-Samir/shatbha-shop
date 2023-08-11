const mongoose = require("mongoose");

const connectDB = () => {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000, // Wait 5 seconds before timing out
			heartbeatFrequencyMS: 10000, // Send a heartbeat every 10 seconds
		})
		.then(() => console.log("database connected successfully"))
		.catch((err) => console.log("error connecting to mongodb", err));
};

module.exports = connectDB;
