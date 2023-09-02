import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";

const WishList = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();

	return (
		<Layout
			robots={false}
			canonicalUrl={`/wish-list`}
			ogUrl={`/wish-list`}
			ogTitle={"قائمة المفضلة - Shatbha Shop | شطبها شوب"}
			ogDescription={"قائمة المفضلة في متجر شطبها شوب"}
			title={"قائمة المفضلة - Shatbha Shop | شطبها شوب"}
			description={"قائمة المفضلة في متجر شطبها شوب"}
			ogImage={"smallbitmap.svg"}
			msapplicationTileImage={"smallbitmap.svg"}
			author={"Shatbha Shop | شطبها شوب"}
			keywords={
				"قائمة المفضلة, متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
			}
			className={"py-5"}
		></Layout>
	);
};

export default WishList;
