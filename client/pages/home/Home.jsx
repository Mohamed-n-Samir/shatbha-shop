import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { useMediaQuery } from "react-responsive";
import Hero from "../../src/Components/Hero/Hero";
import Section1 from "../../src/Components/Section1/Section1";

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
			</main>
		</Layout>
	);
};

export default Home;
