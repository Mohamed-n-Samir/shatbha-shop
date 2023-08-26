import React, { useState } from "react";
import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { Row, Col, Form, Button, Stack } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { useShoppingCart } from "../../src/context/ShoppingCartContext";
import useQueryCustom from "../../src/hooks/useQueryCustom";
import useMutationCustom from "../../src/hooks/useMutationCustom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

import "./checkout.css";

const Checkout = () => {
	// window.scrollTo(0, 0);
	const navigate = useNavigate();
	const { user } = useDataProvider();
	if (user === "none" || !user) {
		navigate("/login");
	}
	const { cartItems, getCartTotal } = useShoppingCart();
	const [termCheck, setTermCheck] = useState(true);
	const [addressCheck, setAddressCheck] = useState(false);
	const [radio, setRadio] = useState("pwr"); //pay when recive   (visa) pay with bank card
	const [form, setForm] = useState({
		products: cartItems.map(({ id, quantity }) => ({ _id: id, quantity })),
		city: "",
		area: "",
		buildingAndApartment: "",
		notes: "",
	});

	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["city-data"],
		"/getAllCities",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	const { mutate, isLoading: mutateLoading } = useMutationCustom({
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
				queryClient.invalidateQueries("brands-table-data");
			}
		},
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	const handleRadioChange = (e) => {
		setRadio(e.target.value);
	};

	const handleSubmit = () => {
		if (addressCheck && form.city === "") {
			return toast.error("المدينه لا يمكن ان تكون فارغه", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} else if (addressCheck && form.area) {
			return toast.error("المنطقه لا يمكن ان تكون فارغه", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} else if (addressCheck && form.area) {
			return toast.error("المبني و الشقه لا يمكن ان تكون فارغه", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} else {
			console.log(form);
			if (radio === "pwr") {
				console.log("pwr");
			} else if (radio === "visa") {
				console.log("visa");
			}
			mutate(['createOrder',form])
			
		}
	};

	if (cartItems.length > 0) {
		return (
			<Layout>
				<header className=" bg-secondary py-5" style={{}}>
					<div className="container d-flex justify-content-around align-items-center">
						<h1
							style={{
								fontSize: "4rem",
								fontWeight: "bolder",
								color: "white",
							}}
						>
							تأكيد الطلب
						</h1>
						<ShoppingCartCheckout color="" sx={{ fontSize: 200 }} />
					</div>
				</header>
				<main className="container pt-5">
					<Row>
						<Col className="px-5">
							<h3 className="pt-5">تفاصيل الفاتورة</h3>
							<hr className="w-" />
							<div className="">
								<Form.Group className="d-flex align-items-center gap-3 mt-5">
									<Form.Check
										type="checkbox"
										onChange={() => {
											setAddressCheck(!addressCheck);
											setForm({
												...form,
												area: "",
												city: "",
												buildingAndApartment: "",
											});
										}}
										required
										id="pay4"
									/>
									<Form.Label htmlFor="pay4" className="fs-3">
										هل تودّ الشحن لعنوان مختلف؟
									</Form.Label>
								</Form.Group>
								<div
									className="mt-5"
									style={{
										display: addressCheck
											? "block"
											: "none",
										height: addressCheck
											? "fit-content"
											: "0",
										transition: "all .3s ease-in-out",
									}}
								>
									<Stack className="form-add">
										<Form.Group
											controlId="city"
											className="my-3  "
										>
											<Form.Label className="fs-4">
												المدينه
											</Form.Label>
											<Form.Select
												placeholder="Select City"
												className="p-3 uneditable-input"
												onChange={handleChange}
												name="city"
												value={form.city}
											>
												<option value="" hidden={true}>
													اختر المدينه (ان لم تجد
													المدينه الخاصه بك فلا يوجد
													خدمه شحن لها)
												</option>
												{data?.data?.map((city) => {
													return (
														city.name !==
															"Admin" && (
															<option
																value={city._id}
																key={city._id}
															>
																{city.name}
															</option>
														)
													);
												})}
											</Form.Select>
										</Form.Group>
										<Form.Group controlId="area">
											<Form.Label className="fs-4">
												المنطقه
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="ادخل المنطقه"
												onChange={handleChange}
												name="area"
												value={form.area}
											/>
										</Form.Group>
										<Form.Group controlId="buildingAndApartment">
											<Form.Label className="fs-4">
												المبني و الشقه
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="عماره رقم ... / الشقه رقم ..."
												onChange={handleChange}
												name="buildingAndApartment"
												value={
													form.buildingAndApartment
												}
											/>
										</Form.Group>
									</Stack>
								</div>
								<Form.Group
									className="mt-5"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label className="fs-4">
										ملاحظات الطلب (اختياري)
									</Form.Label>
									<Form.Control
										as="textarea"
										name="notes"
										rows={6}
										onChange={handleChange}
									/>
								</Form.Group>
							</div>
						</Col>
						<Col className="px-5">
							<div
								className="talabak d-flex justify-content-between flex-column bg-white p-5 rounded"
								style={{
									boxShadow: "0 0 .5rem rgba(0,0,0,.2)",
								}}
							>
								<h3>طلبك</h3>
								<div className="d-flex justify-content-between align-items-center mt-5">
									<h4>المنتج</h4>
									<h4>المجموع</h4>
								</div>
								<hr />
								{cartItems.map((item, index) => {
									return (
										<React.Fragment key={item.id}>
											<div className="d-flex justify-content-between align-items-center mt-5">
												<h4 className="w-50">
													{item.title}
												</h4>
												<h4>x{item.quantity}</h4>
												<h4>
													{item.newPrice *
														item.quantity}
												</h4>
											</div>
											{index !== cartItems.lenth - 1 && (
												<hr className="mt-5" />
											)}
										</React.Fragment>
									);
								})}
								<div className="d-flex justify-content-between align-items-center mt-5">
									<h4>المجموع الكلي</h4>
									<h4>{getCartTotal()}</h4>
								</div>
								<hr className="mt-5" />
								<div className="d-flex justify-content-between align-items-center mt-5">
									<h4>التوصيل</h4>
									<h4 className="w-50 text-center">
										استلام عند{" "}
										{form.city === "" || form.area === ""
											? `${user.city.name}/${user.area}/${user.buildingAndApartment}`
											: `${
													data?.data?.find(
														(obj) =>
															obj._id ===
															form.city
													).name
											  }/${form.area}/${
													form.buildingAndApartment
											  }`}{" "}
										<span className="d-block mt-3">
											EGP {user.city.shippingCharge}.00
										</span>
									</h4>
								</div>
								<hr className="mt-5" />
								<div className="d-flex justify-content-between align-items-center mt-5">
									<h4>الإجمالي</h4>
									<h4>
										{getCartTotal() +
											user.city.shippingCharge}
									</h4>
								</div>
								<hr className="mt-5" />
								<div className="d-flex justify-content-between align-items-center mt-5">
									<Form
										style={{
											direction: "rtl",
										}}
									>
										<Form.Group className="d-flex align-items-center gap-3">
											<Form.Check
												type="radio"
												name="payment"
												id="pay1"
												defaultChecked
												value={"pwr"}
												onChange={handleRadioChange}
											/>
											<Form.Label
												htmlFor="pay1"
												className="fs-4"
											>
												دفع عند الاستلام
											</Form.Label>
										</Form.Group>
										<Form.Group className="d-flex align-items-center gap-3">
											<Form.Check
												type="radio"
												name="payment"
												id="pay2"
												value={"visa"}
												onChange={handleRadioChange}
											/>
											<Form.Label
												htmlFor="pay2"
												className="fs-4"
											>
												دفع بالبطاقه البنكيه
											</Form.Label>
										</Form.Group>
									</Form>
								</div>
								<p className="mt-5 fs-3 fw-bold">
									سيتم استخدام بياناتك الشخصية لمعالجة طلبك،
									ودعم تجربتك عبر هذا الموقع، ولأغراض أخرى
									موضحة في موقعنا{" "}
									<Link to={"privacy-policy"}>
										سياسة الخصوصية.
									</Link>
								</p>
								<Form.Group className="d-flex align-items-center gap-3 mt-5">
									<Form.Check
										type="checkbox"
										id="pay3"
										onChange={() => {
											setTermCheck(!termCheck);
										}}
										required
									/>
									<Form.Label htmlFor="pay3" className="fs-4">
										لقد قرأتُ{" "}
										<Link to={"terms-conditions"}>
											الشروط والأحكام
										</Link>{" "}
										وأوافق عليها لهذا الموقع
									</Form.Label>
								</Form.Group>
								<Button
									variant="dark mt-2 p-4 fs-4"
									disabled={termCheck}
									onClick={handleSubmit}
								>
									تأكيد الطلب
								</Button>
							</div>
						</Col>
					</Row>
				</main>
			</Layout>
		);
	} else {
		return (
			<Layout>
				<div className="d-flex justify-content-center align-items-center flex-column gap-5 p-5">
					{" "}
					<h3>سلة مشترياتك فارغة حاليًا.</h3>
					<Button variant="dark py-3 px-4 fs-4" onClick={()=> {
						navigate("/products")
					}}>
						العودة إلى المتجر
					</Button>
				</div>
			</Layout>
		);
	}
};

export default Checkout;
