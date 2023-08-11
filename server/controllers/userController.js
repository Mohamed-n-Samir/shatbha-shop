// // const jwt = require("jsonwebtoken");
// const User = require("../model/User");
// const Lecture = require("../model/Lecture");
// const CashCode = require("../model/CashCode");
// const Action = require("../model/Action");
// const Transaction = require("../model/Transaction");
// const UserExam = require("../model/UserExam");
// const Exam = require("../model/Exam");
// const {
// 	validateEmail,
// 	validateStringlength,
// 	validateNumberlength,
// 	genUsername,
// 	validateUsername,
// 	linkValidation,
// } = require("../helpers/validation");
// const bcrypt = require("bcrypt");
// const generateToken = require("../helpers/tokens");

// const register = async (req, res) => {
// 	let action;
// 	try {
// 		const {
// 			email,
// 			password,
// 			fullName,
// 			username,
// 			gender,
// 			callNumber,
// 			dadNumber,
// 			mumNumber,
// 			city,
// 			school,
// 			nationalId,
// 			facebookProfile,
// 			studentLevel,
// 		} = await req.body;

// 		if (!validateEmail(email))
// 			return res.status(400).json({ error: "invalid email" });
// 		const checkedEmail = await User.findOne({ email: email.toLowerCase() });

// 		if (checkedEmail)
// 			return res.status(400).json({ error: "Email already exists" });

// 		let newUsername;
// 		if (username === undefined || username === "") {
// 			const tempUsername = fullName
// 				.split(" ")
// 				.splice(0, 2)
// 				.join("")
// 				.toLowerCase();
// 			newUsername = await genUsername(tempUsername);
// 		} else {
// 			const validated = validateUsername(username);
// 			if (validated) {
// 				const userFound = await User.findOne({ username });
// 				if (userFound) {
// 					return res
// 						.status(400)
// 						.json({ error: "Username is already taken" });
// 				} else {
// 					newUsername = username;
// 				}
// 			} else {
// 				return res.status(400).json({ error: "Username is invalid " });
// 			}
// 		}

// 		if (
// 			callNumber === dadNumber ||
// 			callNumber === mumNumber ||
// 			dadNumber === mumNumber
// 		)
// 			return res
// 				.status(400)
// 				.json({ error: "Phone Numbers can't be Repeated" });

// 		if (!validateStringlength(fullName, 10, 60))
// 			return res
// 				.status(400)
// 				.json({ error: "fullName must by between 10 and 60 letters" });
// 		if (!validateStringlength(password, 8, 30))
// 			return res
// 				.status(400)
// 				.json({ error: "password must by between 8 and 30 letters" });

// 		if (!validateNumberlength(callNumber, 201000000000, 201999999999))
// 			return res.status(400).json({
// 				error: "callNumber must by 12 numbers started with 2",
// 			});
// 		if (!validateNumberlength(dadNumber, 201000000000, 201999999999))
// 			return res
// 				.status(400)
// 				.json({ error: "dadNumber must by 12 numbers started with 2" });
// 		if (!validateNumberlength(mumNumber, 201000000000, 201999999999))
// 			return res
// 				.status(400)
// 				.json({ error: "mumNumber must by 12 numbers started with 2" });
// 		if (!validateNumberlength(nationalId, 10000000000000, 99999999999999))
// 			return res.status(400).json({
// 				error: "please enter the correct nationl-id that consists of 14 numbers",
// 			});

// 		if (!linkValidation(facebookProfile))
// 			return res.status(400).json({
// 				error: "please enter the correct facebook Profile link to send invitation for the fb group",
// 			});

// 		let iscallNumberFound =
// 			(await User.findOne({ callNumber })) == null ? false : true;

// 		if (iscallNumberFound) {
// 			return res.status(400).json({
// 				error: "This number is already exsist",
// 			});
// 		}
// 		let isnationalIdFound =
// 			(await User.findOne({ nationalId })) == null ? false : true;

// 		if (isnationalIdFound) {
// 			return res.status(400).json({
// 				error: "This nationalId is already exsist",
// 			});
// 		}
// 		let isFaceProfileFound =
// 			(await User.findOne({ facebookProfile })) == null ? false : true;

// 		if (isFaceProfileFound) {
// 			return res.status(400).json({
// 				error: "This Facebook Profile is already exsist",
// 			});
// 		}

// 		const cryptedPassword = await bcrypt.hash(password, 12);
// 		const user = await new User({
// 			fullName,
// 			email: email.toLowerCase(),
// 			password: cryptedPassword,
// 			username: newUsername,
// 			callNumber,
// 			gender,
// 			dadNumber,
// 			city,
// 			facebookProfile,
// 			mumNumber,
// 			nationalId,
// 			school,
// 			studentLevel,
// 		}).save();
// 		res.send({
// 			message:
// 				"Register Success ! please wait for the admin to contact with you",
// 		});
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 	}
// };

// const login = async (req, res) => {
// 	try {
// 		const { email, password } = req.body;
// 		let action;
// 		const user = await User.findOne({ email: email.toLowerCase() });
// 		if (!user) {
// 			action = new Action({
// 				type: "LoginFaild",
// 				action: `${email} tried to login but email is invalid!`,
// 			});
// 			await action.save();
// 			return await res
// 				.status(400)
// 				.json({ message: "this email is invalid!" });
// 		}
// 		if (user.suspended === true) {
// 			action = new Action({
// 				type: "LoginFaild",
// 				action: `${email} tried to login but email is suspended!`,
// 			});
// 			await action.save();
// 			return await res.status(400).json({
// 				message:
// 					"your account has been suspended please contact the admin",
// 			});
// 		}
// 		const checkpwd = await bcrypt.compare(password, user.password);
// 		if (!checkpwd) {
// 			action = new Action({
// 				type: "LoginFaild",
// 				action: `${email} tried to login but invalid password was enterd! => {${password}}}`,
// 			});
// 			await action.save();
// 			return await res
// 				.status(400)
// 				.json({ message: "this password is invalid!" });
// 		} else {
// 			if (user.numberVerified == true) {
// 				try {
// 					const token = generateToken(
// 						{ id: JSON.stringify(user._id) },
// 						"3d"
// 					);
// 					await User.updateOne(
// 						{ email: email.toLowerCase() },
// 						{ $set: { lastseen: Date.now() } }
// 					);

// 					action = new Action({
// 						type: "LoginSuccess",
// 						action: `${email} tried to login and login success!`,
// 						userId: user._id,
// 					});
// 					await action.save();

// 					res.cookie("jwt", token, {
// 						httpOnly: true,
// 						maxAge: 1000 * 60 * 60 * 24 * 3,
// 						sameSite: "strict",
// 						secure: false,
// 					})
// 						.status(200)
// 						.json({
// 							username: user.username,
// 							id: user._id,
// 							role: user.role,
// 						});
// 				} catch (error) {
// 					action = new Action({
// 						type: "LoginFaild",
// 						action: `${email} tried to login but something went wrong => ${error.message}!`,
// 						userId: user._id,
// 					});
// 					await action.save();
// 					res.json({
// 						message: error.message,
// 					});
// 				}
// 			} else {
// 				action = new Action({
// 					type: "LoginFaild",
// 					action: `${email} tried to login and credientials are right but still not verified!`,
// 					userId: user._id,
// 				});
// 				await action.save();

// 				res.json({
// 					message:
// 						"please be patient and wait for the admin to contact you",
// 				});
// 			}
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: error.massage });
// 	}
// };

// const logout = async (req, res) => {
// 	try {
// 		await User.updateOne(
// 			{ _id: res.locals.id },
// 			{ $set: { lastseen: Date.now() } }
// 		);

// 		res.cookie("jwt", "", { maxAge: 1 });
// 		res.status(200).json({ message: "logout successfully" });
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

// const getUserData = async (req, res) => {
// 	try {
// 		const user = await User.findById(res.locals.id).populate("lectures");
// 		const isModified = await User.updateOne(
// 			{ _id: res.locals.id },
// 			{ $set: { lastseen: Date.now() } }
// 		);

// 		res.status(200).json({
// 			username: user.username,
// 			id: user._id,
// 			role: user.role,
// 			lectures: user.lectures,
// 			cash: user.cash,
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

// const changePassword = async (req, res) => {
// 	let action;
// 	try {
// 		const user = await User.findById(res.locals.id);
// 		const { oldPassword, newPassword } = req.body;
// 		if (user) {
// 			const checkpwd = await bcrypt.compare(oldPassword, user.password);
// 			if (!checkpwd) {
// 				action = new Action({
// 					type: "changePasswordFaild",
// 					action: `${user.email} tried to change password but old password is invalid!`,
// 					userId: user._id,
// 				});
// 				await action.save();
// 				return await res
// 					.status(400)
// 					.json({ message: "old password is invalid!" });
// 			} else {
// 				const cryptedPassword = await bcrypt.hash(newPassword, 12);
// 				await User.updateOne(
// 					{ _id: res.locals.id },
// 					{ password: cryptedPassword }
// 				);
// 				action = new Action({
// 					type: "changePasswordSuccess",
// 					action: `${user.email} changed password successfully!`,
// 					userId: user._id,
// 				});
// 				await action.save();
// 				res.status(200).json({
// 					message: "password changed Successfully!",
// 				});
// 			}
// 		}
// 	} catch (error) {
// 		action = new Action({
// 			type: "changePasswordFaild",
// 			action: `id(${res.locals.id}) tried to change password but something went wrong!`,
// 			userId: res.locals.id,
// 		});
// 		await action.save();
// 		res.status(500).json({ message: error.message });
// 	}
// };

// const chargeCredit = async (req, res) => {
// 	const regex = /^[a-zA-Z0-9]*$/;
// 	let transaction;
// 	try {
// 		const { code } = req.body;
// 		if (!code) {
// 			transaction = new Transaction({
// 				type: "ChargeFaild",
// 				description: `id(${res.locals.id}) tried to charge credit provides no cash code!`,
// 				userId: res.locals.id,
// 			});
// 			await transaction.save();
// 			return res.status(400).json({ message: "code is required!" });
// 		}
// 		if (code.length != 16 || !regex.test(code)) {
// 			transaction = new Transaction({
// 				type: "ChargeFaild",
// 				description: `id(${res.locals.id}) tried to charge credit provides wrong regex cash code!`,
// 				userId: res.locals.id,
// 				cashCode: code,
// 			});
// 			await transaction.save();
// 			return res.status(400).json({ message: "code is invalid!" });
// 		}
// 		const cashCode = await CashCode.findOne({
// 			code: code,
// 			isUsed: false,
// 			isPrinted: true,
// 		}).exec();

// 		if (cashCode) {
// 			await User.updateOne(
// 				{ _id: res.locals.id },
// 				{ $inc: { cash: cashCode.value } }
// 			);
// 			await CashCode.updateOne(
// 				{ code: code },
// 				{ isUsed: true, usedBy: res.locals.id }
// 			);
// 			transaction = new Transaction({
// 				type: "ChargeSuccess",
// 				description: `id(${res.locals.id}) tried to charge credit provided code ${cashCode.code} and charging done successfully!`,
// 				userId: res.locals.id,
// 				amount: cashCode.value,
// 				cashCode: code,
// 			});
// 			await transaction.save();
// 			return res
// 				.status(200)
// 				.json({ message: "credit charged Successfully!" });
// 		} else {
// 			transaction = new Transaction({
// 				type: "ChargeFaild",
// 				description: `id(${res.locals.id}) tried to charge credit but the code either notprinted or used before!`,
// 				userId: res.locals.id,
// 				cashCode: code,
// 			});
// 			await transaction.save();

// 			return res.status(400).json({ message: "code is invalid!" });
// 		}
// 	} catch (error) {
// 		transaction = new Transaction({
// 			type: "ChargeFaild",
// 			description: `id(${res.locals.id}) tried to charge credit but something went wrong => ${error.message}!`,
// 			userId: res.locals.id,
// 			cashCode: code,
// 		});
// 		await transaction.save();
// 		res.status(500).json({ message: error.message });
// 	}
// };

// const buyLecture = async (req, res) => {
// 	let action;
// 	try {
// 		const user = await User.findById(res.locals.id);
// 		if (user) {
// 			const { lectureID } = req.body;
// 			if (!lectureID) {
// 				action = new Action({
// 					type: "buyLectureFaild",
// 					action: `${user.email} tried to buy lecture but lectureID is required!`,
// 					userId: user._id,
// 				});
// 				await action.save();
// 				return res
// 					.status(400)
// 					.json({ message: "lectureID is required!" });
// 			}
// 			const lecture = await Lecture.findById(lectureID);
// 			if (!lecture) {
// 				action = new Action({
// 					type: "buyLectureFaild",
// 					action: `${user.email} tried to buy lecture but lectureID is invalid!`,
// 					userId: user._id,
// 				});
// 				await action.save();
// 				return res
// 					.status(400)
// 					.json({ message: "lectureID is invalid!" });
// 			}
// 			if (user.cash < lecture.price) {
// 				action = new Action({
// 					type: "buyLectureFaild",
// 					action: `${user.email} tried to buy lecture but not enough cash!`,
// 					userId: user._id,
// 				});
// 				await action.save();
// 				return res.status(400).json({ message: "not enough cash!" });
// 			}
// 			if (user.lectures.includes(lectureID)) {
// 				action = new Action({
// 					type: "buyLectureFaild",
// 					action: `${user.email} tried to buy lecture but lecture already bought!`,
// 					userId: user._id,
// 				});
// 				await action.save();
// 				return res
// 					.status(400)
// 					.json({ message: "lecture already bought!" });
// 			}
// 			await User.updateOne(
// 				{ _id: res.locals.id },
// 				{
// 					$inc: { cash: -lecture.price },
// 					$push: {
// 						lectures: {
// 							lecture: lectureID,
// 							isExpired: false,
// 						},
// 					},
// 				}
// 			);
// 			const action = new Action({
// 				userId: user._id,
// 				action: "Successfully bought lecture " + lecture.title,
// 				type: "buyLectureSuccess",
// 			});

// 			await action.save();
// 			return res
// 				.status(200)
// 				.json({ message: "lecture bought Successfully!" });
// 		} else {
// 			action = new Action({
// 				type: "buyLectureFaild",
// 				action: `id(${res.locals.id}) tried to buy lecture but user not found! make sure to check this id this might be a bot`,
// 				userId: res.locals.id,
// 			});
// 			await action.save();
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

// const setUserExam = async (req, res) => {
// 	let action;
// 	try {
// 		const user = await User.findById(res.locals.id);
// 		const { examID } = req.body;
// 		if (!examID) {
// 			action = new Action({
// 				type: "examFaild",
// 				action: `${user.email} tried to set user exam but examID is required!`,
// 				userId: user._id,
// 			});
// 			await action.save();
// 			return res.status(400).json({ message: "examID is required!" });
// 		}
// 		const userExam = await UserExam.findOne({
// 			exam: examID,
// 			user: res.locals.id,
// 		});

// 		if (!userExam) {
// 			const userExam = new UserExam({
// 				user: res.locals.id,
// 				exam: examID,
// 				isExpired: false,
// 			});
// 			await userExam.save();
// 			action = new Action({
// 				type: "examStart",
// 				action: `${user.email} set user exam successfully!`,
// 				userId: user._id,
// 			});
// 			await action.save();
// 			return res.status(200).json({ message: "Entering Exam !" });
// 		} else {
// 			if (userExam.isExpired) {
// 				action = new Action({
// 					type: "examFaild",
// 					action: `${user.email} tried to set user exam but exam already expired!`,
// 					userId: user._id,
// 				});
// 				await action.save();
// 				return res
// 					.status(400)
// 					.json({ message: "exam already expired!" });
// 			} else {
// 				const dateNow = Date.now();
// 				if (userExam.ExpiredAt - dateNow > 0) {
// 					action = new Action({
// 						type: "examStart",
// 						action: `${
// 							user.email
// 						} user entered exam again before time finished by => ${
// 							userExam.ExpiredAt - dateNow
// 						}!`,
// 						userId: user._id,
// 					});
// 					await action.save();

// 					return res.status(200).json({ message: "Entering Exam !" });
// 				} else {
// 					submitExam(req, res);
// 				}
// 			}
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

// const submitExam = async (req, res) => {
// 	let action;
// 	try {
// 		const { examID, answers } = req.body;
// 		if (!examID) {
// 			action = new Action({
// 				type: "examFaild",
// 				action: `id(${res.locals.id}) tried to submit exam but examID is required!`,
// 				userId: res.locals.id,
// 			});
// 			await action.save();
// 			return res.status(400).json({ message: "examID is required!" });
// 		}
// 		if (!answers) {
// 			action = new Action({
// 				type: "examFaild",
// 				action: `id(${res.locals.id}) tried to submit exam but answers is required!`,
// 				userId: res.locals.id,
// 			});
// 			await action.save();
// 			return res.status(400).json({ message: "answers is required!" });
// 		}
// 		const exam = await Exam.findById(examID);
// 		if (!exam) {
// 			action = new Action({
// 				type: "examFaild",
// 				action: `id(${res.locals.id}) tried to submit exam but examID is invalid!`,
// 				userId: res.locals.id,
// 			});
// 			await action.save();
// 			return res.status(400).json({ message: "examID is invalid!" });
// 		}
// 		const userExam = await UserExam.findOne({
// 			exam: examID,
// 			user: res.locals.id,
// 		});
// 		if (!userExam) {
// 			action = new Action({
// 				type: "examFaild",
// 				action: `id(${res.locals.id}) tried to submit exam but examID is invalid!`,
// 				userId: res.locals.id,
// 			});
// 			await action.save();
// 			return res.status(400).json({ message: "examID is invalid!" });
// 		}
// 		if (userExam.isExpired) {
// 			action = new Action({
// 				type: "examFaild",
// 				action: `id(${res.locals.id}) tried to submit exam but exam already expired!`,
// 				userId: res.locals.id,
// 			});
// 			return res.status(400).json({ message: "exam already expired!" });
// 		}

// 		let score = 0;
// 		let isPassed = false;
// 		for (let i = 0; i < exam.questions.length; i++) {
// 			if (exam.questions[i].answer == answers[i].userAnswer) {
// 				score++;
// 			}
// 		}
// 		if (score >= exam.questions.length / 2) {
// 			isPassed = true;
// 		}
// 		await UserExam.updateOne(
// 			{ user: res.locals.id, exam: examID },
// 			{ isExpired: true, score, userAnswers: answers, isPassed }
// 		);
// 		action = new Action({
// 			type: "examDone",
// 			action: `id(${res.locals.id}) submitted exam successfully with Score: ${score}!`,
// 			userId: res.locals.id,
// 		});
// 		await action.save();
// 		return res.status(200).json({ message: "Exam Submitted !" });
// 	} catch (error) {
// 		action = new Action({
// 			type: "examFaild",
// 			action: `id(${res.locals.id}) tried to submit exam but error occured => ${error.message}!`,
// 			userId: res.locals.id,
// 		});
// 		await action.save();
// 		res.status(500).json({ message: error.message });
// 	}
// };

// module.exports = {
// 	register,
// 	buyLecture,
// 	login,
// 	logout,
// 	getUserData,
// 	changePassword,
// 	chargeCredit,
// 	setUserExam,
// 	submitExam,
// }; //activateAccount, genNewToken
