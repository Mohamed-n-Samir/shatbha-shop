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
		<Layout
			robots={true}
			canonicalUrl={`/register`}
			ogUrl={`/register`}
			ogTitle={
				"تسجيل حساب جديد - Shatbha Shop | شطبها شوب"
			}
			ogDescription={
				"سجل حساب جديد في متجر شطبها شوب لتتمكن من إدارة طلباتك و المنتجات و معلوماتك الشخصية"
			}
			title={
				"تسجيل حساب جديد - Shatbha Shop | شطبها شوب"
			}
			description={
				"سجل حساب جديد في متجر شطبها شوب لتتمكن من إدارة طلباتك و المنتجات و معلوماتك الشخصية"
			}
			ogImage={"smallbitmap.svg"}
			msapplicationTileImage={"smallbitmap.svg"}
			author={"Shatbha Shop | شطبها شوب"}
			keywords={
				"انشاء حساب,تسجيل حساب جديد, متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
			}
		>
			<RegisterForm />
		</Layout>
	);
};

export default Register;
