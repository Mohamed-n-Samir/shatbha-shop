import Layout from "../../src/Components/Layout/Layout";
import LoginForm from "../../src/Components/LoginForm/LoginForm";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
	window.scrollTo(0, 0);
	const { user } = useDataProvider();

	// const isMobileScreen = useMediaQuery({
	// 	query: "(max-width: 600px)",
	// });

	if(user !== "none" && user){
		return <Navigate to="/" replace={true}/>
	}else {
		return (
			<Layout>
				<LoginForm />
			</Layout>
		);
	} 
};

export default Login;
