import { useState } from "react";
import Layout from "../../src/Components/Layout/Layout";
import StoreSection from "../../src/Components/StoreSection/StoreSection";
import ProductAside from "../../src/Components/ProductAside/LazyProductAside";
import "./store.css"

const MIN = 0;
const MAX = 15000;

const Store = () => {
	window.scrollTo(0, 0);

	const [value, setValue] = useState([MIN, MAX]);
	const [comValue, setcomValue] = useState([MIN, MAX]);
	const [sort,setSort] = useState("-createdAt")


	return (
		<Layout>
			<main className={`d-flex store pt-3`}>
				<ProductAside value={value} setValue={setValue} MIN={MIN} MAX={MAX} setcomValue={setcomValue} setSort={setSort}/>
				<StoreSection gte={comValue[0]} lte={comValue[1]} sort={sort}/>
			</main>
		</Layout>
	);
};

export default Store;
