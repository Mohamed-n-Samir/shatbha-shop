import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";

const TermsAndCon = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();

	return (
		<Layout
			robots={true}
			canonicalUrl={`/terms-and-conditions`}
			ogUrl={`/terms-and-conditions`}
			ogTitle={"الشروط و الأحكام - Shatbha Shop | شطبها شوب"}
			ogDescription={"الشروط و الأحكام في متجر شطبها شوب"}
			title={"الشروط و الأحكام - Shatbha Shop | شطبها شوب"}
			description={"الشروط و الأحكام في متجر شطبها شوب"}
			ogImage={"smallbitmap.svg"}
			msapplicationTileImage={"smallbitmap.svg"}
			author={"Shatbha Shop | شطبها شوب"}
			keywords={
				"الشروط و الأحكام, متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
			}
			className={"py-5"}
		></Layout>
	);
};

export default TermsAndCon;
