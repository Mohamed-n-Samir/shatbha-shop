import { useState } from "react";
import { Form, Button,Row } from "react-bootstrap";
import useMutationCustom from "../../hooks/useMutationCustom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { useDataProvider } from "../../hooks/useDataProvider";


const LoginFormBody = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
    const { dispatch } = useDataProvider();

	const { mutate, isLoading } = useMutationCustom({
		onSuccess: (data) => {
			console.log(data);
			if (data) {
				console.log(data);
                dispatch({
                    type: "LOGIN",
                    payload: data.data.user,
                });
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
			mutate(["login", form]);
		} catch (err) {
			console.log(err);
		}
		console.log(form);
	};

	return (
		<Form className="rounded p-4 p-sm-3 login-form">
			<Form.Group controlId="email" className="my-3">
				<Form.Label>البريد الاكتروني</Form.Label>
				<Form.Control
					type="email"
					placeholder="ادخل البريد الاكتروني"
					name="email"
					onChange={handleChange}
				/>
			</Form.Group>

			<Form.Group controlId="password">
				<Form.Label>كلمه المرور</Form.Label>
				<Form.Control
					type="password"
					placeholder="ادخل كلمه المرور"
					name="password"
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
					تسجيل الدخول
				</Button>
			</Row>
		</Form>
	);
};

export default LoginFormBody;
