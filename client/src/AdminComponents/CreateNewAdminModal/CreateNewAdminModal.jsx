import { useState } from "react";
import useMutationCustom from "../../hooks/useMutationCustom";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import { useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import "./new-admin-modal.css";

// import {
// 	Dialog,
// 	DialogTitle,
// 	DialogContent,
// 	DialogActions,
// 	Button,
// 	Stack,
// 	TextField,
// 	FormControl,
// 	InputLabel,
// 	Select,
// 	MenuItem,
// } from "@mui/material";

const CreateNewAdminModal = ({ open, onClose }) => {
	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		mobile: "",
		gender: "",
	});
	const [errors, setErrors] = useState({});
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutationCustom({
		onSuccess: (data) => {
			console.log(data);
			if (data) {
				console.log(data);
				toast.success(data.data.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				onClose();
				queryClient.invalidateQueries("allUsers");
			}
		},
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value.trim() });
		console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			mutate(["createAdmin", form]);
		} catch (err) {
			console.log(err);
		}
		console.log(form);
	};

	return (
		<Dialog open={open}>
			<CloseIcon onClick={()=> {
				onClose();
			}} className="m-2 fs-2" style={{
				cursor: "pointer",
			}}/>
			<DialogTitle
				textAlign="center"
				fontWeight={"bold"}
				fontSize={"3rem"}
			>
				اضف مسؤل
			</DialogTitle>
			<DialogContent
				sx={{
					maxWidth: "50rem",
				}}
			>
				<Form className="rounded p-4 p-sm-3 register-form">
					<Row>
						<Col>
							<Form.Group controlId="firstName">
								<Form.Label>الاسم الاول</Form.Label>
								<Form.Control
									type="text"
									placeholder="ادخل الاسم الاول"
									name="firstname"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="lastName">
								<Form.Label>الاسم الاخير</Form.Label>
								<Form.Control
									type="text"
									placeholder="ادخل الاسم الاخير"
									name="lastname"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group controlId="email" className="my-3">
						<Form.Label>البريد الاكتروني</Form.Label>
						<Form.Control
							type="email"
							placeholder="ادخل البريد الاكتروني"
							name="email"
							onChange={handleChange}
						/>
					</Form.Group>
					<Row>
						<Col>
							<Form.Group controlId="password">
								<Form.Label>كلمه المرور</Form.Label>
								<Form.Control
									type="password"
									placeholder="ادخل كلمه المرور"
									name="password"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="confirmPassword">
								<Form.Label>تاكيد كلمه المرور</Form.Label>
								<Form.Control
									type="password"
									placeholder="تاكيد كلمه المرور"
									name="confirmPassword"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group controlId="phone" className="my-3">
						<Form.Label>رقم الهاتف</Form.Label>
						<Form.Control
							type="text"
							placeholder="ادخل رقم الهاتف"
							name="mobile"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="gender" className="my-3">
						<Form.Label>الجنس</Form.Label>
						<br />
						<Form.Check
							inline
							label="ذكر"
							value={"Male"}
							name="gender"
							type={"radio"}
							id={`radio-1`}
							onChange={handleChange}
						/>
						<Form.Check
							inline
							label="انثي"
							name="gender"
							value={"female"}
							type={"radio"}
							id={`radio-2`}
							onChange={handleChange}
						/>
					</Form.Group>
					{isLoading && (
						<Row className="justify-content-center">
							<HashLoader size={30} />
						</Row>
					)}
					<Row>
						<Button
							className="p-3 fs-4 my-4"
							type="submit"
							variant="dark"
							onClick={handleSubmit}
							disabled={isLoading}
						>
							انشاء حساب
						</Button>
					</Row>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

// const [isExpired, setIsExpired] = useState("");
// const [isError, setIsError] = useState("All Feilds are required");
// const [values, setValues] = useState({
// 	firstname: "",
// 	lastname: "",
// 	email: "",
// 	password: "",
// 	mobile: "",
//     gender:""
// });

// console.log(values);

// const handleSubmit = () => {
// 	//put your validation logic here
// 	console.log(values);
// 	onSubmit(values);
// };

// const handleChange = (e) => {
// 	setIsExpired(e.target.value);
// 	setValues({
// 		...values,
// 		[e.target.name]: e.target.value,
// 	});
// };

// // console.log(values);

// return (
// 	<Dialog open={open}>
// 		<DialogTitle textAlign="center">Add Admin</DialogTitle>
// 		<DialogContent>
// 			<form
// 				onSubmit={(e) => {
// 					e.preventDefault();
// 				}}
// 			>
// 				<Stack
// 					sx={{
// 						width: "100%",
// 						minWidth: { xs: "300px", sm: "360px", md: "400px" },
// 						gap: "1.5rem",
// 						padding: "1rem 0",
// 					}}
// 				>
// 					<TextField
// 						label={"ألأسم الأول"}
// 						name={"firstname"}
// 						onChange={(e) =>
// 							setValues({
// 								...values,
// 								[e.target.name]: e.target.value,
// 							})
// 						}
// 					/>
// 					<TextField
// 						label={"lastname"}
// 						name={"الأسم الأخير"}
// 						onChange={(e) =>
// 							setValues({
// 								...values,
// 								[e.target.name]: e.target.value,
// 							})
// 						}
// 					/>
// 					<FormControl fullWidth>
// 						<InputLabel id="demo-simple-select-label">
// 							Is Expired
// 						</InputLabel>
// 						<Select
// 							value={isExpired}
// 							label={"Is Expired"}
// 							name={"isExpired"}
// 							onChange={handleChange}
// 						>
// 							<MenuItem value={"true"}>true</MenuItem>
// 							<MenuItem value={"false"}>false</MenuItem>
// 						</Select>
// 					</FormControl>
// 				</Stack>
// 			</form>
// 		</DialogContent>
// 		<DialogActions sx={{ p: "1.25rem" }}>
// 			<Button onClick={onClose}>Cancel</Button>
// 			<Button
// 				color="secondary"
// 				onClick={handleSubmit}
// 				variant="contained"
// 			>
// 				Add Admin
// 			</Button>
// 		</DialogActions>
// 	</Dialog>
// );
// };

export default CreateNewAdminModal;
