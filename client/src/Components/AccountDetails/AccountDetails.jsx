import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import useQueryCustom from "../../hooks/useQueryCustom";
import useMutationCustom from "../../hooks/useMutationCustom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { useDataProvider } from "../../hooks/useDataProvider";
import { useQueryClient } from "@tanstack/react-query";
import "./account-details.css";

const AccountDetails = () => {
	const { user } = useDataProvider();
	const [passConfirm, setPassConfirm] = useState("");
	const [form, setForm] = useState({
		firstname: user?.firstname,
		lastname: user?.lastname,
		email: user?.email,
		oldPassword: "",
		newPassword: "",
		mobile: user?.mobile,
		buildingAndApartment: user?.buildingAndApartment,
		city: user?.city?._id,
		area: user?.area,
	});
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
			console.log(data);
			if (data) {
				console.log(data);
				toast.success(data?.data?.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				queryClient.invalidateQueries("userData");
			}
		},
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			mutate(["register", form]);
		} catch (err) {
			console.log(err);
		}
		console.log(form);
	};

	return (
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
							value={form.firstname}
						/>
					</Form.Group>
					{user?.firstname !== form.firstname && (
						<div className="mt-4">
							<Button
								variant="dark py-2 p-3 fs-4"
								onClick={() => {
									mutate([
										`updateUser-user`,
										{ firstname: form.firstname },
										"patch",
									]);
								}}
                                disabled={form.firstname.length < 3}
							>
								حفظ
							</Button>
							<Button
								variant="danger py-2 p-3 fs-4 me-3"
								onClick={() => {
									setForm({
										...form,
										firstname: user?.firstname,
									});
								}}
							>
								الغاء
							</Button>
						</div>
					)}
				</Col>
				<Col>
					<Form.Group controlId="lastName">
						<Form.Label>الاسم الاخير</Form.Label>
						<Form.Control
							type="text"
							placeholder="ادخل الاسم الاخير"
							name="lastname"
							onChange={handleChange}
							value={form.lastname}
						/>
					</Form.Group>
					{user?.lastname !== form?.lastname && (
						<div className="mt-4">
							<Button
								variant="dark py-2 p-3 fs-4"
								onClick={() => {
									mutate([
										`updateUser-user`,
										{ lastname: form.lastname },
										"patch",
									]);
								}}
                                disabled={form.lastname.length < 3}
							>
								حفظ
							</Button>
							<Button
								variant="danger py-2 p-3 fs-4 me-3"
								onClick={() => {
									setForm({
										...form,
										lastname: user?.lastname,
									});
								}}
							>
								الغاء
							</Button>
						</div>
					)}
				</Col>
			</Row>
			<Form.Group controlId="email" className="my-3">
				<Form.Label>البريد الاكتروني</Form.Label>
				<Form.Control
					type="email"
					placeholder="ادخل البريد الاكتروني"
					name="email"
					value={form.email}
					disabled={true}
				/>
			</Form.Group>
			<Form.Group controlId="phone" className="my-3">
				<Form.Label>رقم الهاتف</Form.Label>
				<Form.Control
					type="text"
					placeholder="ادخل رقم الهاتف"
					name="mobile"
					onChange={handleChange}
					value={form.mobile}
				/>
				{user?.mobile !== form?.mobile && (
					<div className="mt-4">
						<Button
							variant="dark py-2 p-3 fs-4"
							onClick={() => {
								mutate([
									`updateUser-user`,
									{ mobile: form.mobile },
									"patch",
								]);
							}}
							disabled={!validateMobile(form.mobile)}
						>
							حفظ
						</Button>
						<Button
							variant="danger py-2 p-3 fs-4 me-3"
							onClick={() => {
								setForm({
									...form,
									mobile: user?.mobile,
								});
							}}
						>
							الغاء
						</Button>
					</div>
				)}
			</Form.Group>
			<Form.Group controlId="city" className="my-3">
				<Form.Label>المدينه</Form.Label>
				<Form.Select
					placeholder="Select City"
					className="p-3 uneditable-input"
					onChange={handleChange}
					name="city"
					value={form.city?._id}
					disabled={user.role === "admin"}
				>
					<option value="0" hidden={true}>
						اختر المدينه (ان لم تجد المدينه الخاصه بك فلا يوجد خدمه
						شحن لها)
					</option>
					{data?.data?.allCities.map((city) => {
						return (
							city.name !== "Admin" && (
								<option value={city?._id} key={city._id}>
									{city.name}
								</option>
							)
						);
					})}
				</Form.Select>
				{user.role !== "admin" && user?.city?._id !== form.city && (
					<div className="mt-4">
						<Button
							variant="dark py-2 p-3 fs-4"
							onClick={() => {
								mutate([
									`updateUser-user`,
									{ city: form?.city },
									"patch",
								]);
							}}
						>
							حفظ
						</Button>
						<Button
							variant="danger py-2 p-3 fs-4 me-3"
							onClick={() => {
								setForm({
									...form,
									city: user?.city,
								});
							}}
						>
							الغاء
						</Button>
					</div>
				)}
			</Form.Group>
			<Form.Group controlId="area">
				<Form.Label>المنطقه</Form.Label>
				<Form.Control
					type="text"
					placeholder="ادخل المنطقه"
					onChange={handleChange}
					name="area"
					value={form.area}
					disabled={user.role === "admin"}
				/>
				{user.role !== "admin" && user?.area !== form.area && (
					<div className="mt-4">
						<Button
							variant="dark py-2 p-3 fs-4"
							onClick={() => {
								mutate([
									`updateUser-user`,
									{ area: form.area },
									"patch",
								]);
							}}
                            disabled={form.area.length < 3}
						>
							حفظ
						</Button>
						<Button
							variant="danger py-2 p-3 fs-4 me-3"
							onClick={() => {
								setForm({
									...form,
									area: user?.area,
								});
							}}
						>
							الغاء
						</Button>
					</div>
				)}
			</Form.Group>
			<Form.Group controlId="buildingAndApartment" className="my-4">
				<Form.Label>المبني و الشقه</Form.Label>
				<Form.Control
					type="text"
					placeholder="عماره رقم ... / الشقه رقم ..."
					onChange={handleChange}
					name="buildingAndApartment"
					value={form.buildingAndApartment}
					disabled={user.role === "admin"}
				/>
				{user.role !== "admin" &&
					user?.buildingAndApartment !==
						form.buildingAndApartment && (
						<div className="mt-4">
							<Button
								variant="dark py-2 p-3 fs-4"
								onClick={() => {
									mutate([
										`updateUser-user`,
										{
											buildingAndApartment:
												form.buildingAndApartment,
										},
										"patch",
									]);
								}}
							>
								حفظ
							</Button>
							<Button
								variant="danger py-2 p-3 fs-4 me-3"
								onClick={() => {
									setForm({
										...form,
										buildingAndApartment:
											user?.buildingAndApartment,
									});
								}}
                                disabled={form.buildingAndApartment.length < 3}
							>
								الغاء
							</Button>
						</div>
					)}
			</Form.Group>

			<Row>
				<Col sm={12} md={4} lg={4}>
					<Form.Group controlId="password">
						<Form.Label>كلمه المرور القديمه</Form.Label>
						<Form.Control
							type="password"
							placeholder="ادخل كلمه المرور"
							name="oldPassword"
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col sm={12} md={4} lg={4}>
					<Form.Group>
						<Form.Label>كلمه المرور الجديده</Form.Label>
						<Form.Control
							type="password"
							placeholder="ادخل كلمه المرور"
							name="newPassword"
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col sm={12} md={4} lg={4}>
					<Form.Group controlId="confirmPassword">
						<Form.Label>تاكيد كلمه المرور</Form.Label>
						<Form.Control
							type="password"
							placeholder="تاكيد كلمه المرور"
							name="confirmPassword"
							onChange={(e) => setPassConfirm(e.target.value)}
						/>
					</Form.Group>
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
					variant="dark"
					onClick={() => {
						// console.log("clicked");
						if (passConfirm === form.newPassword) {
							mutate([
								"passwordChange",
								{
									newPassword: form.newPassword,
									oldPassword: form.oldPassword,
								},
								"put",
							]);
							setForm({
								...form,
								newPassword: "",
								oldPassword: "",
							});
							setconfirmPassword("");
						} else {
							toast.error("كلمه المرور غير متطابقه", {
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
					}}
					disabled={
						isLoading ||
						passConfirm === "" ||
						passConfirm.length < 8 ||
						form.newPassword === "" ||
						form.newPassword.length < 8 ||
						form.oldPassword === "" ||
						form.oldPassword.length < 8
					}
				>
					تغيير كلمه المرور
				</Button>
			</Row>
		</Form>
	);
};

export default AccountDetails;

const validateMobile = (mobileNumber) => {
	const regex = /^01[0125][0-9]{8}$/gm;

	if (regex.test(mobileNumber)) {
		return true;
	}

	return false;
};
