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

	if (user !== "none" && user) {
		return <Navigate to="/" replace={true} />;
	} else {
		return (
			<Layout
				robots={true}
				canonicalUrl={`/login`}
				ogUrl={`/login`}
				ogTitle={
					"تسجيل الدخول - Shatbha Shop | شطبها شوب"
				}
				ogDescription={
					"سجل دخول لحسابك في متجر شطبها شوب لتتمكن من إدارة طلباتك و المنتجات و معلوماتك الشخصية"
				}
				title={
					"تسجيل الدخول - Shatbha Shop | شطبها شوب"
				}
				description={
					"سجل دخول لحسابك في متجر شطبها شوب لتتمكن من إدارة طلباتك و المنتجات و معلوماتك الشخصية"
				}
				ogImage={"smallbitmap.svg"}
				msapplicationTileImage={"smallbitmap.svg"}
				author={"Shatbha Shop | شطبها شوب"}
				keywords={
					"تسجيل دخول, متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
				}
			>
				<LoginForm />
			</Layout>
		);
	}
};

export default Login;
