import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import useQueryCustom from "../../hooks/useQueryCustom";
import useMutationCustom from "../../hooks/useMutationCustom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const RegFormBody = () => {
	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		city: "",
		mobile: "",
		area: "",
		buildingAndApartment: "",
		gender: "",
	});
	const [errors, setErrors] = useState({});
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
			<Form.Group controlId="city" className="my-3">
				<Form.Label>المدينه</Form.Label>
				<Form.Select
					placeholder="Select City"
					className="p-3 uneditable-input"
					onChange={handleChange}
					name="city"
				>
					<option value="0" hidden={true}>
						اختر المدينه (ان لم تجد المدينه الخاصه بك فلا يوجد خدمه
						شحن لها)
					</option>
					{data?.data?.map((city) => {
						return (
							city.name !== "Admin" && (
								<option value={city._id} key={city._id}>
									{city.name}
								</option>
							)
						);
					})}
				</Form.Select>
			</Form.Group>
			<Form.Group controlId="area">
				<Form.Label>المنطقه</Form.Label>
				<Form.Control
					type="text"
					placeholder="ادخل المنطقه"
					onChange={handleChange}
					name="area"
				/>
			</Form.Group>
			<Form.Group controlId="buildingAndApartment">
				<Form.Label>المبني و الشقه</Form.Label>
				<Form.Control
					type="text"
					placeholder="عماره رقم ... / الشقه رقم ..."
					onChange={handleChange}
					name="buildingAndApartment"
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
	);
};

export default RegFormBody;
