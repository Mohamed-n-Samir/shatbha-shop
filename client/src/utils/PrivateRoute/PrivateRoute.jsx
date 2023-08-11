import { Outlet, Navigate } from "react-router-dom";
import { useDataProvider } from "../../hooks/useDataProvider";

const PrivateRoute = () => {
	const { user } = useDataProvider();
	let auth = (user && user?.role === "admin") ? true : false;

	if (!auth) {
		return <Navigate to="/404" />;
	}

	return <Outlet />;
};

export default PrivateRoute;
