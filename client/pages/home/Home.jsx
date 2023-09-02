import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { useMediaQuery } from "react-responsive";
import Hero from "../../src/Components/Hero/Hero";
import Section1 from "../../src/Components/Section1/Section1";
import LazySection2 from "../../src/Components/Section2/LazySection2";
import LazySection3 from "../../src/Components/Section3/LazySection3";
import LazySection4 from "../../src/Components/Section4/LazySection4";

const Home = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();
	const isMobileScreen = useMediaQuery({
		query: "(max-width: 600px)",
	});
	console.log(user);
	return (
		<Layout
			robots={true}
			canonicalUrl={`/`}
			ogUrl={`/`}
			ogTitle={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه - Shatbha Shop | شطبها شوب"
			}
			ogDescription={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه تسوق أون لاين خلاطات المياه و أحواض المطبخ و ديكور المطبخ و الحمام و أطقم المرحاض و حوض الحمام"
			}
			title={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه - Shatbha Shop | شطبها شوب"
			}
			description={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه تسوق أون لاين خلاطات المياه و أحواض المطبخ و ديكور المطبخ و الحمام و أطقم المرحاض و حوض الحمام"
			}
			ogImage={"smallbitmap.svg"}
			msapplicationTileImage={"smallbitmap.svg"}
			author={"Shatbha Shop | شطبها شوب"}
			keywords={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
			}
			preloadImages={[
				"https://ik.imagekit.io/shatbhashop/shatbha-shop-carousel/1.jpg",
				"https://ik.imagekit.io/shatbhashop/shatbha-shop-carousel/2.jpg",
				"https://ik.imagekit.io/shatbhashop/shatbha-shop-carousel/3.jpg",
			]}
		>
			<Hero />
			<main className="container">
				<Section1 />
				<LazySection2 />
				<LazySection3 />
				<LazySection4 />
			</main>
		</Layout>
	);
};

export default Home;
