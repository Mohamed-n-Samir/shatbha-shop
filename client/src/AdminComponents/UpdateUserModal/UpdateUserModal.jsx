import { useEffect, useState } from "react";
import useMutationCustom from "../../hooks/useMutationCustom";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import { useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import { Delete } from "@mui/icons-material";
import useQueryCustom from "../../hooks/useQueryCustom";

const UpdateUserModal = ({ open, onClose, row }) => {
	console.log(row);
	const [form, setForm] = useState({
		_id: "",
		city: "",
		gender: "",
	});
	const [initState, setInitState] = useState({});
	const [errors, setErrors] = useState({});
	const queryClient = useQueryClient();

	const { data, isError, error, isSuccess } = useQueryCustom(
		["cities"],
		"/getAllCities",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	const { mutate, isLoading } = useMutationCustom({
		onSuccess: (data) => {
			console.log(data?.data?.message);
			if (data?.data?.message) {
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
				queryClient.invalidateQueries("users-table-data");
			}
		},
	});

	useEffect(() => {
		setForm({
			city: row?.city?._id,
			gender: row?.gender,
			_id: row?._id,
		});
		setInitState({
			city: row?.city?._id,
			gender: row?.gender,
			_id: row?._id,
		});
	}, [row]);

	// console.log(form, initState);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	return (
		<Dialog open={open}>
			<CloseIcon
				onClick={() => {
					setForm({
						city: row?.city?._id,
						gender: row?.gender,
						_id: row?._id,
					});
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
				تحديث المستخدم
			</DialogTitle>
			<DialogContent
				sx={{
					maxWidth: "50rem",
				}}
			>
				<Form className="rounded p-4  p-sm-3 register-form">
					<Form.Group controlId="city" className="my-3">
						<Form.Label>المدينه</Form.Label>
						<Form.Select
							placeholder="Select City"
							className="p-3 uneditable-input"
							onChange={handleChange}
							name="city"
							value={form?.city}
						>
							<option value="0" hidden={true}>
								اختر المدينه (ان لم تجد المدينه الخاصه بك فلا
								يوجد خدمه شحن لها)
							</option>
							{data?.data?.allCities?.map((city) => {
								return (
									city.name !== "Admin" && (
										<option value={city._id} key={city._id}>
											{city.name}
										</option>
									)
								);
							})}
						</Form.Select>
						{initState?.city !== form?.city && (
							<div className="mt-4">
								<Button
									variant="dark py-2 p-3 fs-4"
									onClick={() => {
										mutate([
											`updateUser-admin/${form._id}`,
											{
												city: form?.city,
											},
											"patch",
										]);
										setInitState({
											...initState,
											city: form?.city,
										});
									}}
								>
									حفظ
								</Button>
								<Button
									variant="danger py-2 p-3 fs-4 me-3"
									onClick={() => {
										setForm({
											...form,
											city: initState?.city,
										});
									}}
								>
									الغاء
								</Button>
							</div>
						)}
					</Form.Group>
					<Form.Group controlId="gender" className="my-3">
						<Form.Label>الجنس</Form.Label>
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
								value={"Female"}
								type={"radio"}
								id={`radio-2`}
								onChange={handleChange}
							/>
						</Form.Group>
						{initState?.gender !== form?.gender && (
							<div className="mt-4">
								<Button
									variant="dark py-2 p-3 fs-4"
									onClick={() => {
										mutate([
											`updateUser-admin/${form._id}`,
											{
												gender: form?.gender,
											},
											"patch",
										]);
										setInitState({
											...initState,
											gender: form?.gender,
										});
									}}
								>
									حفظ
								</Button>
							</div>
						)}
					</Form.Group>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateUserModal;
