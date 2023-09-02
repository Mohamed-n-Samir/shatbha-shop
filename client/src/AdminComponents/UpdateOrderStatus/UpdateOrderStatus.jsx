import { useEffect, useState } from "react";
import useMutationCustom from "../../hooks/useMutationCustom";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import { useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import { Delete } from "@mui/icons-material";

const UpdateOrderStatus = ({ open, onClose, row }) => {
	console.log(row);
	const [form, setForm] = useState({
		_id: "",
		orderStatus: "",
	});
	const [initState, setInitState] = useState({});
	const queryClient = useQueryClient();

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
				queryClient.invalidateQueries("orders-table-data");
			}
		},
	});

	useEffect(() => {
		setForm({
			_id: row?._id,
			orderStatus: row?.orderStatus,
		});
		setInitState({
			_id: row?._id,
			orderStatus: row?.orderStatus,
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
					<Form.Group controlId="orderStatus" className="my-3">
						<Form.Label>حاله الطلب</Form.Label>
						<Form.Select
							placeholder="Select order سtatus"
							className="p-3 uneditable-input"
							onChange={handleChange}
							name="orderStatus"
							value={form?.orderStatus}
						>
							<option value={"Not Processed"}>
								Not Processed
							</option>
							<option value={"Processed"}>Processed</option>
							<option value={"Dispatched"}>Dispatched</option>
							<option value={"Delivered"}>Delivered</option>
							<option value={"Cancelled"}>Cancelled</option>
						</Form.Select>
						{initState?.orderStatus !== form?.orderStatus && (
							<div className="mt-4">
								<Button
									variant="dark py-2 p-3 fs-4"
									onClick={() => {
										mutate([
											`updateOrder/${form._id}`,
											{
												orderStatus: form?.orderStatus,
											},
											"patch",
										]);
										setInitState({
											...initState,
											orderStatus: form?.orderStatus,
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
											orderStatus: initState?.orderStatus,
										});
									}}
								>
									الغاء
								</Button>
							</div>
						)}
					</Form.Group>
				</Form>
				{isLoading && (
					<div className="my-4 d-flex justify-content-center align-items-center">
                        <HashLoader size={40} />
                    </div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateOrderStatus;
