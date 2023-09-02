import { useEffect, useState } from "react";
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
// import "./new-product-modal.css";

const UpdateProductModal = ({ open, onClose, row }) => {
	console.log(row);
	const [form, setForm] = useState({
		description: "",
		category: "",
		brand: "",
		images: [{ id: 0, url: "" }],
		tags: [],
	});
	const [initState, setInitState] = useState({});
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
				// setForm({
				// 	description: "",
				// 	category: "",
				// 	brand: "",
				// 	images: [{ id: 0, url: "" }],
				// 	tags: [],
				// });
				// onClose();
				queryClient.invalidateQueries("allProducts");
			}
		},
	});

	useEffect(() => {
		setForm({
			description: row?.description,
			category: row?.category?._id,
			brand: row?.brand?._id,
			images: row?.images,
			tags: row?.tags,
			_id: row?._id,
		});
		setInitState({
			description: row?.description,
			category: row?.category?._id,
			brand: row?.brand?._id,
			images: row?.images,
			tags: row?.tags,
		});
	}, [row]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	const handleMultiSelectChange = (values) => {
		const myTagsSet = new Set(values.map((value) => value.value));
		setForm({
			...form,
			tags: Array.from(myTagsSet),
		});
		console.log(form.tags);
	};

	const handleSubmit = (e) => {
		setInitState({
			...initState,
			description: form?.description,
		});
	};

	return (
		<Dialog open={open}>
			<CloseIcon
				onClick={() => {
					setForm({
						description: "",
						category: "",
						brand: "",
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
				تحديث المنتج
			</DialogTitle>
			<DialogContent
				sx={{
					maxWidth: "50rem",
				}}
			>
				<Form className="rounded p-4  p-sm-3 register-form">
					<Form.Group controlId="description" className="mb-3">
						<Form.Label>الوصف</Form.Label>
						<Form.Control
							as="textarea"
							type="textarea"
							placeholder="ادخل الوصف"
							name="description"
							onChange={handleChange}
							value={form.description}
						/>
					</Form.Group>
					{initState?.description !== form.description && (
						<div className="mt-4">
							<Button
								variant="dark py-2 p-3 fs-4"
								onClick={() => {
									if (form.description.description < 10)
										return toast.error(
											"يجب ان يكون الوصف اكثر من 10 حروف",
											{
												position: "top-center",
												autoClose: 5000,
												hideProgressBar: false,
												closeOnClick: true,
												pauseOnHover: true,
												draggable: true,
												progress: undefined,
												theme: "dark",
											}
										);

									mutate([
										`updateProduct/${form._id}`,
										{
											description:
												form?.description?.trim(),
										},
										"patch",
									]);
									setInitState({
										...initState,
										description: form?.description,
									});
								}}
								disabled={form.description.description < 10}
							>
								حفظ
							</Button>
							<Button
								variant="danger py-2 p-3 fs-4 me-3"
								onClick={() => {
									setForm({
										...form,
										description: initState?.description,
									});
								}}
							>
								الغاء
							</Button>
						</div>
					)}
					<BrandChoose
						handleChange={handleChange}
						brandID={form?.brand}
					/>
					{initState?.brand !== form?.brand && (
						<div className="mt-4">
							<Button
								variant="dark py-2 p-3 fs-4"
								onClick={() => {
									mutate([
										`updateProduct/${form._id}`,
										{
											brand: form?.brand,
										},
										"patch",
									]);
									setInitState({
										...initState,
										brand: form?.brand,
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
										brand: initState?.brand,
									});
								}}
							>
								الغاء
							</Button>
						</div>
					)}

					<CatChoose
						handleChange={handleChange}
						categoryID={form?.category}
					/>
					{initState?.category !== form?.category && (
						<div className="mt-4">
							<Button
								variant="dark py-2 p-3 fs-4"
								onClick={() => {
									mutate([
										`updateProduct/${form._id}`,
										{
											category: form?.category,
										},
										"patch",
									]);
									setInitState({
										...initState,
										category: form?.category,
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
										category: initState?.category,
									});
								}}
							>
								الغاء
							</Button>
						</div>
					)}
					<Form.Group as={Col} controlId="tags">
						<Form.Label>الاقسام الفرعيه</Form.Label>
						<MultiSelect handleChange={handleMultiSelectChange} />
					</Form.Group>
					{initState?.tags !== form?.tags &&
						form?.tags?.length !== 0 && (
							<div className="mt-4">
								<Button
									variant="dark py-2 p-3 fs-4"
									onClick={() => {
										if (form.tags.length === 0)
											return toast.error(
												"يجب اختيار قسم واحد على الاقل",
												{
													position: "top-center",
													autoClose: 5000,
													hideProgressBar: false,
													closeOnClick: true,
													pauseOnHover: true,
													draggable: true,
													progress: undefined,
													theme: "dark",
												}
											);
										mutate([
											`updateProduct/${form._id}`,
											{
												tags: form?.tags,
											},
											"patch",
										]);
										setInitState({
											...initState,
											tags: form?.tags,
										});
									}}
									disabled={form?.tags?.length === 0}
								>
									حفظ
								</Button>
							</div>
						)}
					<Form.Group controlId="images" className="mt-2">
						<Form.Label>الصور</Form.Label>
						{form?.images?.map((image, index) => (
							<div className=" position-relative" key={index}>
								<Form.Control
									type="text"
									placeholder={`ادخل رابط الصوره ${
										index + 1
									}`}
									name="images"
									value={image.url}
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
							{form?.images?.length !== 0 &&
								form.images !== initState.images && (
									<div className="mt-4">
										<Button
											variant="dark py-2 p-3 fs-4"
											onClick={() => {
												let falseImages =
													form?.images?.filter(
														(image) =>
															!image?.url?.match(
																/^(http(s?):)\/\/.*\.(?:jpg|jpeg|gif|png|svg|webp|JPG|JPEG|GIF|PNG|SVG|WEBP)$/
															)
													);
												if (falseImages.length !== 0)
													return toast.error(
														"يجب ادخال روابط صور صحيحه",
														{
															position:
																"top-center",
															autoClose: 5000,
															hideProgressBar: false,
															closeOnClick: true,
															pauseOnHover: true,
															draggable: true,
															progress: undefined,
															theme: "dark",
														}
													);

												mutate([
													`updateProduct/${form._id}`,
													{
														images: form?.images,
													},
													"patch",
												]);
												setInitState({
													...initState,
													images: form?.images,
												});
											}}
											disabled={
												form?.images?.length === 0
											}
										>
											حفظ
										</Button>
										<Button
											variant="danger py-2 p-3 fs-4 me-3"
											onClick={() => {
												setForm({
													...form,
													images: initState?.images,
												});
											}}
										>
											الغاء
										</Button>
									</div>
								)}
						</Col>
					</Row>
					{isLoading && (
						<Row className="justify-content-center">
							<HashLoader size={30} />
						</Row>
					)}
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateProductModal;
