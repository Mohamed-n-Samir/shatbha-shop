import { useState } from "react";
import Layout from "../../src/Components/Layout/Layout";
import StoreSection from "../../src/Components/StoreSection/StoreSection";
import ProductAside from "../../src/Components/ProductAside/LazyProductAside";
import "./store.css"

const MIN = 0;
const MAX = 15000;

const Store = () => {
	const [value, setValue] = useState([MIN, MAX]);
	const [comValue, setcomValue] = useState([MIN, MAX]);
	const [sort,setSort] = useState("-createdAt")
	const [itemsNubmer, setItemsNubmer] = useState(0);


	return (
		<Layout>
			<main className={`d-flex store pt-3`}>
				<ProductAside value={value} setValue={setValue} MIN={MIN} MAX={MAX} setcomValue={setcomValue} setSort={setSort} itemsNubmer={itemsNubmer}/>
				<StoreSection gte={comValue[0]} lte={comValue[1]} sort={sort} setItemsNubmer={setItemsNubmer}/>
			</main>
		</Layout>
	);
};

export default Store;
