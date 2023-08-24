import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import Section1Product from "../../src/Components/Section1Product/Section1Product";

const Product = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();

	return (
		<Layout className={"py-5"}>
			<Section1Product />
		</Layout>
	);
};

export default Product;
