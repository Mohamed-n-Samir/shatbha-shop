import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";

const TermsAndCon = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();

	return (
		<Layout className={"py-5"}>
		</Layout>
	);
};

export default TermsAndCon;
