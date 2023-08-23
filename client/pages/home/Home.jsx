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
		<Layout>
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
