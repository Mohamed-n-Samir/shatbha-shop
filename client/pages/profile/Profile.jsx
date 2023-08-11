import { Navigate } from "react-router-dom";
import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";

const Profile = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();

	if (user === "none" || !user) {
		return <Navigate to="/login" replace={true} />;
	} else {
		return <Layout></Layout>;
	}
};

export default Profile;
