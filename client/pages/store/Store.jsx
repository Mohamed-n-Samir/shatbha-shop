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
		<Layout
			robots={true}
			canonicalUrl={`/products`}
			ogUrl={`/products`}
			ogTitle={"متجر شطبها شوب | Shatbha Shop"}
			ogDescription={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه تسوق أون لاين خلاطات المياه و أحواض المطبخ و ديكور المطبخ و الحمام و أطقم المرحاض و حوض الحمام"
			}
			title={"متجر شطبها شوب | Shatbha Shop"}
			description={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه تسوق أون لاين خلاطات المياه و أحواض المطبخ و ديكور المطبخ و الحمام و أطقم المرحاض و حوض الحمام"
			}
			ogImage={"smallbitmap.svg"}
			msapplicationTileImage={"smallbitmap.svg"}
			author={"Shatbha Shop | شطبها شوب"}
			keywords={
				"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
			}
		>
			<main className={`d-flex store pt-3`}>
				<ProductAside value={value} setValue={setValue} MIN={MIN} MAX={MAX} setcomValue={setcomValue} setSort={setSort} itemsNubmer={itemsNubmer}/>
				<StoreSection gte={comValue[0]} lte={comValue[1]} sort={sort} setItemsNubmer={setItemsNubmer}/>
			</main>
		</Layout>
	);
};

export default Store;
