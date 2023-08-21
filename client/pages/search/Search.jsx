import { useState } from "react";
import Layout from "../../src/Components/Layout/Layout";
import SearchSection from "../../src/Components/SearchSection/SearchSection";
import ProductAside from "../../src/Components/ProductAside/ProductAside";
import "./search.css"

const MIN = 0;
const MAX = 15000;

const Search = () => {
	window.scrollTo(0, 0);

	const [value, setValue] = useState([MIN, MAX]);
	const [comValue, setcomValue] = useState([MIN, MAX]);
	const [sort,setSort] = useState("-createdAt")


	return (
		<Layout>
			<main className={`d-flex searchPage pt-3`}>
				<ProductAside value={value} setValue={setValue} MIN={MIN} MAX={MAX} setcomValue={setcomValue} setSort={setSort}/>
				<SearchSection gte={comValue[0]} lte={comValue[1]} sort={sort}/>
			</main>
		</Layout>
	);
};

export default Search;
