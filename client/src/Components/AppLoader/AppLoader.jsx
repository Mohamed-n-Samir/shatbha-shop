import HashLoader from "react-spinners/HashLoader";
import { useDataProvider } from "../../hooks/useDataProvider";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../App";

const AppLoader = ({ children }) => {
	const { user } = useDataProvider();

	if (user === null || !user) {

		return (
			<div className="is-page-loading">
				<HashLoader/>
			</div>
		);
	} else {
		console.log(user)
		if (user === "none" || user.role === "user" || user.role === "admin") {
			return (
				<>
					<Router>
						<App />
						{children}
					</Router>
				</>
			);
		}
	}
};

export default AppLoader;
