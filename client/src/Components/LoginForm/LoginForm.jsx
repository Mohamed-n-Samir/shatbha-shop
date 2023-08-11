import FormContainer from "../FormContainer/FormContainer";
import LoginFormBody from "./LoginFormBody";
import "./login-form.css";

const LoginForm = () => {
	return (
			<FormContainer className="bg-white rounded p-4 shadow-lg">
				<h1
					style={{
						fontSize: "4rem",
						padding: "1.5rem 1rem",
					}}
				>
					تسجيل الدخول
				</h1>

				<LoginFormBody />
			</FormContainer>
	);
};

export default LoginForm;
