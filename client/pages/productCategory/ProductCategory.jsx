import { useEffect, useState } from "react";
import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { useParams, useSearchParams } from "react-router-dom";
import useQueryCustom from "../../src/hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";
import { Row, Col } from "react-bootstrap";
import Card2 from "../../src/Components/Card2/Card2";
import ProductAside from "../../src/Components/ProductAside/LazyProductAside";
import "./product-cat.css";

const MIN = 0;
const MAX = 15000;

const productCategory = () => {
	const { user } = useDataProvider();
	const { categoryID } = useParams();
	const [searchParams] = useSearchParams();
	const [value, setValue] = useState([MIN, MAX]);
	const [comValue, setcomValue] = useState([MIN, MAX]);
	const [sort, setSort] = useState("-createdAt");
	const [itemsNubmer, setItemsNubmer] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const limit = 9;
	const gte = comValue[0];
	const lte = comValue[1];

	console.log(searchParams);

	const { data, isError, isFetching, isLoading, refetch, isPreviousData } =
		useQueryCustom(
			["product-category-data", pageNumber, gte, lte, sort, categoryID],
			"/allProductForUsers",
			{
				refetchOnMount: false,
				refetchOnWindowFocus: false,
				keepPreviousData: true,
			},
			{
				params: {
					page: pageNumber,
					limit: limit,
					newPrice: {
						gte: gte,
						lte: lte,
					},
					sort: sort,
					tags: categoryID,
				},
			}
		);

	useEffect(() => {
		if (data?.data?.products?.productCount) {
			setItemsNubmer(data?.data?.products?.productCount);
		}
	}, [data?.data?.products?.productCount]);

	const [pageNumberLimit, setPageNumberLimit] = useState(4);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

	if (isLoading || isFetching) {
		return (
			<div className="loading-section">
				<HashLoader size={40} />
			</div>
		);
	}

	if (isError) {
		return (
			<Layout
				robots={true}
				canonicalUrl={`/product-category/${categoryID}`}
				ogUrl={`/product-category/${categoryID}`}
				ogTitle={`قسم - Shatbha Shop | شطبها شوب`}
				ogDescription={`قسم - Shatbha Shop | شطبها شوب`}
				title={`قسم - Shatbha Shop | شطبها شوب`}
				description={`قسم - Shatbha Shop | شطبها شوب`}
				ogImage={"smallbitmap.svg"}
				msapplicationTileImage={"smallbitmap.svg"}
				author={"Shatbha Shop | شطبها شوب"}
				keywords={`قسم - Shatbha Shop | شطبها شوب`}
			>
				<main className={`d-flex store pt-3`}>
					<ProductAside
						value={value}
						setValue={setValue}
						MIN={MIN}
						MAX={MAX}
						setcomValue={setcomValue}
						setSort={setSort}
						itemsNubmer={itemsNubmer}
					/>
					<section className="d-flex flex-column gap-5 store-section">
						<h1
							style={{
								fontSize: "4rem",
								fontWeight: "700",
							}}
						>
							القسم
						</h1>
						<div className="is-loading">
							<h2 className="text-center text-danger align-self-start">
								حدث خطأ اثناء التحميل اعد تحميل الصفحه!!!
							</h2>
						</div>
					</section>
				</main>
			</Layout>
		);
	}

	const totalPageNumber = Math.ceil(
		data && data?.data?.products?.productCount / limit
	);
	const pagesArray = new Array(totalPageNumber).fill().map((_, i) => i + 1);
	let pageIncrementBtn = null;
	if (pagesArray.length > maxPageNumberLimit) {
		pageIncrementBtn = (
			<button
				className="pagination-btn"
				onClick={() => {
					setPageNumberLimit(pageNumberLimit + 4);
					setMinPageNumberLimit(minPageNumberLimit + 4);
					setMaxPageNumberLimit(maxPageNumberLimit + 4);
				}}
			>
				&hellip;
			</button>
		);
	}
	let pageDecrementBtn = null;
	if (minPageNumberLimit >= 1) {
		pageDecrementBtn = (
			<button
				className="pagination-btn"
				onClick={() => {
					setPageNumberLimit(pageNumberLimit - 4);
					setMinPageNumberLimit(minPageNumberLimit - 4);
					setMaxPageNumberLimit(maxPageNumberLimit - 4);
				}}
			>
				&hellip;
			</button>
		);
	}

	if (data && data?.data?.products?.productCount === 0) {
		return (
			<Layout
				robots={true}
				canonicalUrl={`/product-category/${categoryID}`}
				ogUrl={`/product-category/${categoryID}`}
				ogTitle={`${data?.data?.products?.category} قسم - Shatbha Shop | شطبها شوب`}
				ogDescription={`تصفح المنتجات واختر ما تريد من قسم ال ${data?.data?.products?.category} - Shatbha Shop | شطبها شوب`}
				title={`${data?.data?.products?.category} قسم - Shatbha Shop | شطبها شوب`}
				description={`تصفح المنتجات واختر ما تريد من قسم ال ${data?.data?.products?.category} - Shatbha Shop | شطبها شوب`}
				ogImage={"smallbitmap.svg"}
				msapplicationTileImage={"smallbitmap.svg"}
				author={"Shatbha Shop | شطبها شوب"}
				keywords={
					"القسم, القسم الفرعي, " +
					data?.data?.products?.category +
					", متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
				}
			>
				<main className={`d-flex store pt-3`}>
					<ProductAside
						value={value}
						setValue={setValue}
						MIN={MIN}
						MAX={MAX}
						setcomValue={setcomValue}
						setSort={setSort}
						itemsNubmer={itemsNubmer}
					/>
					<section className="d-flex flex-column gap-5 store-section">
						<h1
							style={{
								fontSize: "4rem",
								fontWeight: "700",
							}}
						>
							القسم
						</h1>

						<div className="is-loading align-items-start">
							<h2 className="text-center">!!! لا يوجد منتجات</h2>
						</div>
					</section>
				</main>
			</Layout>
		);
	}

	if (data && data?.data?.products?.productCount > 0) {
		return (
			<Layout
				robots={true}
				canonicalUrl={`/product-category/${categoryID}`}
				ogUrl={`/product-category/${categoryID}`}
				ogTitle={`${data?.data?.products?.category} قسم - Shatbha Shop | شطبها شوب`}
				ogDescription={`تصفح المنتجات واختر ما تريد من قسم ال ${data?.data?.products?.category} - Shatbha Shop | شطبها شوب`}
				title={`${data?.data?.products?.category} قسم - Shatbha Shop | شطبها شوب`}
				description={`تصفح المنتجات واختر ما تريد من قسم ال ${data?.data?.products?.category} - Shatbha Shop | شطبها شوب`}
				ogImage={"smallbitmap.svg"}
				msapplicationTileImage={"smallbitmap.svg"}
				author={"Shatbha Shop | شطبها شوب"}
				keywords={
					"القسم, القسم الفرعي, " +
					data?.data?.products?.category +
					", متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
				}
			>
				<main className={`d-flex store pt-3`}>
					<ProductAside
						value={value}
						setValue={setValue}
						MIN={MIN}
						MAX={MAX}
						setcomValue={setcomValue}
						setSort={setSort}
						itemsNubmer={itemsNubmer}
					/>
					<section className="d-flex flex-column gap-4 store-section">
						{data?.data?.products?.category && (
							<h1
								style={{
									fontSize: "4rem",
									fontWeight: "700",
								}}
							>
								{data?.data?.products?.category}
							</h1>
						)}

						<p
							style={{
								fontSize: "1.5rem",
							}}
						>
							عرض {(pageNumber - 1) * limit + 1}–
							{pageNumber === totalPageNumber
								? data?.data?.products?.productCount
								: limit * pageNumber}{" "}
							من أصل {data?.data?.products?.productCount} نتيجة
						</p>
						<section>
							<Row className="">
								{data?.data?.products?.products?.map(
									(item, index) => {
										return (
											<Col
												style={{
													minHeight: "60rem",
												}}
												key={index}
												className="mb-3 px-2"
												xs={6}
												lg={4}
												sm={6}
												md={6}
												xl={3}
											>
												<Card2
													imgs={item.images}
													category={
														item.category.title
													}
													newPrice={item.newPrice}
													oldPrice={item.oldPrice}
													title={item.title}
													slug={item.slug}
													id={item._id}
													quantity={item.quantity}
												/>
											</Col>
										);
									}
								)}
							</Row>
						</section>
						<div className="pagination">
							<button
								className="pagination-btn"
								onClick={() => {
									if (pageNumber > 1) {
										setPageNumber(pageNumber - 1);
										if (
											(pageNumber - 1) %
												pageNumberLimit ===
											0
										) {
											setMaxPageNumberLimit(
												maxPageNumberLimit -
													pageNumberLimit
											);
											setMinPageNumberLimit(
												minPageNumberLimit -
													pageNumberLimit
											);
										}
									}
								}}
								disabled={
									isPreviousData || pageNumber === 1
										? true
										: false
								}
							>
								{"السابق"}
							</button>
							{pageDecrementBtn}
							{pagesArray.map((page, i) => {
								if (
									page < maxPageNumberLimit + 1 &&
									page > minPageNumberLimit
								) {
									return (
										<button
											key={i}
											className={
												pageNumber === page
													? "pagination-btn active-btn"
													: "pagination-btn"
											}
											onClick={() => {
												setPageNumber(page);
											}}
											disabled={isPreviousData}
										>
											{page}
										</button>
									);
								} else {
									return null;
								}
							})}
							{pageIncrementBtn}
							<button
								className="pagination-btn"
								onClick={() => {
									if (
										pageNumber <
										data?.data?.products?.productCount
									) {
										setPageNumber(pageNumber + 1);
										if (
											pageNumber + 1 >
											maxPageNumberLimit
										) {
											setMaxPageNumberLimit(
												maxPageNumberLimit +
													pageNumberLimit
											);
											setMinPageNumberLimit(
												minPageNumberLimit +
													pageNumberLimit
											);
										}
									}
								}}
								disabled={
									isPreviousData ||
									pageNumber === totalPageNumber
										? true
										: false
								}
							>
								{"التالي"}
							</button>
						</div>
					</section>
				</main>
			</Layout>
		);
	}
};

export default productCategory;
