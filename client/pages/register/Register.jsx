import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { useMediaQuery } from "react-responsive";
import RegisterForm from "../../src/Components/RegisterForm/RegisterForm";

const Register = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();
	const isMobileScreen = useMediaQuery({
		query: "(max-width: 600px)",
	});
	console.log(user);
	return (
		<Layout>
			<RegisterForm />
		</Layout>
	);
};

export default Register;
