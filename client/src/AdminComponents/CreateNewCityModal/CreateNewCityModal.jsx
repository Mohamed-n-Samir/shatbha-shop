import { useState } from "react";
import useMutationCustom from "../../hooks/useMutationCustom";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import { useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import "./new-city-modal.css";

const CreateNewCityModal = ({ open, onClose }) => {
	const [form, setForm] = useState({
		name: "",
		shippingCharge: "",
	});

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
				queryClient.invalidateQueries("shippingcities-table-data");
			}
		},
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value.trim() });
		console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (form.name === "") {
			return toast.error("يجب ادخال اسم المدينه", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} else if (form.shippingCharge === "") {
			return toast.error("يجب ادخال تكلفه الشحن", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
		try {
			mutate(["addCity", form]);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Dialog open={open}>
			<CloseIcon
				onClick={() => {
					onClose();
				}}
				className="m-2 fs-2"
				style={{
					cursor: "pointer",
				}}
			/>
			<DialogTitle
				textAlign="center"
				fontWeight={"bold"}
				fontSize={"3rem"}
			>
				اضف مدينه جديده
			</DialogTitle>
			<DialogContent
				sx={{
					maxWidth: "50rem",
				}}
			>
				<Form className="rounded p-4 p-sm-3 register-form">
					<Form.Group controlId="name">
						<Form.Label>اسم المدينه</Form.Label>
						<Form.Control
							type="text"
							placeholder="ادخل اسم المدينه"
							name="name"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="shippingCharge">
						<Form.Label>رسوم الشحن</Form.Label>
						<Form.Control
							type="text"
							placeholder="ادخل رسوم الشحن"
							name="shippingCharge"
							onChange={handleChange}
						/>
					</Form.Group>
					{isLoading && (
						<Row className="justify-content-center align-items-center">
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
							اضافه مدينه جديده
						</Button>
					</Row>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default CreateNewCityModal;
