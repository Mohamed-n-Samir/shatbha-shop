import { useState } from "react";
import useMutationCustom from "../../hooks/useMutationCustom";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import { useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import MultiSelect from "./MultiSelect";
import CatChoose from "./CatChoose";
import BrandChoose from "./BrandChoose";
import { Delete } from "@mui/icons-material";
import "./new-product-modal.css";

const CreateNewProductModal = ({ open, onClose }) => {
	const [form, setForm] = useState({
		title: "",
		description: "",
		oldPrice: "",
		category: "",
		brand: "",
		quantity: "",
		images: [{ id: 0, url: "" }],
		tags: [],
	});
	const [errors, setErrors] = useState({});
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
				setForm({
					title: "",
					description: "",
					oldPrice: "",
					category: "",
					brand: "",
					quantity: "",
					images: [{ id: 0, url: "" }],
					tags: [],
				});
				onClose();
				queryClient.invalidateQueries("allProducts");
			}
		},
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value.trim() });
		console.log(form);
	};

	const handleMultiSelectChange = (values) => {
		setForm({
			...form,
			tags: values.map((value) => value.value),
		});
		console.log(form.tags);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			mutate(["createProduct", form]);
		} catch (err) {
			console.log(err);
		}
		console.log(form);
	};

	return (
		<Dialog open={open}>
			<CloseIcon
				onClick={() => {
					setForm({
						title: "",
						description: "",
						oldPrice: "",
						category: "",
						brand: "",
						quantity: "",
						images: [{ id: 0, url: "" }],
						tags: [],
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
				اضف منتج جديد
			</DialogTitle>
			<DialogContent
				sx={{
					maxWidth: "50rem",
				}}
			>
				<Form className="rounded p-4 p-sm-3 register-form">
					<Form.Group controlId="title">
						<Form.Label>العنوان</Form.Label>
						<Form.Control
							type="text"
							placeholder="ادخل العنوان"
							name="title"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="description">
						<Form.Label>الوصف</Form.Label>
						<Form.Control
							as="textarea"
							type="textarea"
							placeholder="ادخل الوصف"
							name="description"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="oldPrice" className="my-3">
						<Form.Label>السعر</Form.Label>
						<Form.Control
							type="number"
							min={1}
							placeholder="ادخل ألسعر"
							name="oldPrice"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="quantity">
						<Form.Label>الكميه</Form.Label>
						<Form.Control
							type="number"
							min={1}
							placeholder="ادخل الكميه"
							name="quantity"
							onChange={handleChange}
						/>
					</Form.Group>
					<BrandChoose handleChange={handleChange} />
					<CatChoose handleChange={handleChange} />
					<Form.Group as={Col} controlId="tags">
						<Form.Label>الاقسام الفرعيه</Form.Label>
						<MultiSelect handleChange={handleMultiSelectChange} />
					</Form.Group>
					<Form.Group controlId="images" className="mt-2">
						<Form.Label>الصور</Form.Label>
						{form.images.map((image, index) => (
							<div className=" position-relative" key={index}>
								<Form.Control
									type="text"
									placeholder={`ادخل رابط الصوره ${
										index + 1
									}`}
									name="images"
									value={image.url}
									// dir="ltr"
									onChange={(e) => {
										const newImages = [...form.images];
										newImages[index] = {
											id: index,
											url: e.target.value,
										};
										setForm({ ...form, images: newImages });
									}}
								/>
								{index === form.images.length - 1 && (
									<Delete
										style={{
											color: "var(--danger-color)",
											position: "absolute",
											top: "50%",
											transform: "translateY(-50%)",
											left: "1rem",
											cursor: "pointer",
										}}
										onClick={() => {
											const newImages = [...form.images];
											newImages.splice(index, 1);
											setForm({
												...form,
												images: newImages,
											});
										}}
									/>
								)}
								{image?.url?.match(
									/^(http(s?):)\/\/.*\.(?:jpg|jpeg|gif|png|svg|webp|JPG|JPEG|GIF|PNG|SVG|WEBP)$/
								) && (
									<img
										src={image.url}
										alt="product"
										className="img-fluid"
										style={{
											display: "block",
											width: "10rem",
											height: "10rem",
											objectFit: "cover",
										}}
									/>
								)}
							</div>
						))}
					</Form.Group>
					<Row>
						<Col>
							<Button
								className="p-3 fs-4 my-4"
								variant="dark"
								onClick={() => {
									setForm({
										...form,
										images: [
											...form.images,
											{ id: form.images.length, url: "" },
										],
									});
								}}
								disabled={isLoading}
							>
								اضافه صوره
							</Button>
						</Col>
					</Row>
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
							اضافه منتج
						</Button>
					</Row>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateNewProductModal;
