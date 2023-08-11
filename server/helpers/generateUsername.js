const generateUsername = async (username) => {
	const validated = validateUsername(username);
	if (!validated) {
		return res.status(400).json({ error: "Username is invalid "});
	} else {
		let a = false;
		do {
			let checkedUsername = await User.findOne({ username });
			if (checkedUsername) {
				username += (+new Date().getTime() * Math.random())
					.toString()
					.substring(0, 1);
				a = true;
			} else {
				return username;
			}
		} while (a);
	}
};

module.exports = {generateUsername}