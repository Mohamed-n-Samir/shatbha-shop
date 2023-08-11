import FormContainer from "../FormContainer/FormContainer";
import RegFormBody from "./RegFormBody";
import "./register-form.css";


const RegisterForm = () => {
	return (
		<FormContainer className="bg-white rounded p-4 shadow-lg">
			<h1
				style={{
					fontSize: "4rem",
					padding: "1.5rem 1rem",
				}}
			>
				انشاء حساب
			</h1>

			<RegFormBody />
		</FormContainer>
	);
};

export default RegisterForm;
