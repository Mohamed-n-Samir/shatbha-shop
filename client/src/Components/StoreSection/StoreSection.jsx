import { useState, useEffect } from "react";
import useQueryCustom from "../../hooks/useQueryCustom";
import { Row, Col } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";
import Card2 from "../Card2/Card2";
import { useSearchParams } from "react-router-dom";
import "./store-section.css";

const StoreSection = ({ gte, lte, sort, setItemsNubmer }) => {
	const [searchParams] = useSearchParams();
	const [pageNumber, setPageNumber] = useState(1);
	const limit = 9;

	const { data, isError, isFetching, isLoading, refetch, isPreviousData } =
		useQueryCustom(
			[
				"products-data",
				pageNumber,
				gte,
				lte,
				sort,
				searchParams.get("sr"),
				searchParams.get("cat"),
			],
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
					title: searchParams.get("sr"),
					tags: searchParams.get("cat"),
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
			<section className="d-flex flex-column gap-5 store-section">
				<h1
					style={{
						fontSize: "4rem",
						fontWeight: "700",
					}}
				>
					المتجر
				</h1>
				<div className="is-loading">
					<h2 className="text-center">
						حدث خطأ اثناء التحميل اعد تحميل الصفحه!!!
					</h2>
				</div>
			</section>
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
			<section className="d-flex flex-column gap-5 store-section">
				<h1
					style={{
						fontSize: "4rem",
						fontWeight: "700",
					}}
				>
					المتجر
				</h1>
				{searchParams.get("sr") && (
					<h1
						style={{
							fontSize: "3rem",
							fontWeight: "700",
							color: "var(--text2-color)",
						}}
					>
						نتائج البحث عن: {searchParams.get("sr")}
					</h1>
				)}
				{searchParams.get("cat") && !data?.data?.products?.category ? (
					<h1
						style={{
							fontSize: "3rem",
							fontWeight: "700",
							color: "var(--text2-color)",
						}}
					>
						القسم: {searchParams.get("cat")}
					</h1>
				) : (
					<h1
						style={{
							fontSize: "3rem",
							fontWeight: "700",
							color: "var(--text2-color)",
						}}
					>
						القسم: {data?.data?.products?.category}
					</h1>
				)}
				<div className="is-loading align-items-start">
					<h2 className="text-center">!!! لا يوجد منتجات</h2>
				</div>
			</section>
		);
	}

	if (data && data?.data?.products?.productCount > 0) {
		return (
			<section className="d-flex flex-column gap-4 store-section">
				<h1
					style={{
						fontSize: "4rem",
						fontWeight: "700",
					}}
				>
					المتجر
				</h1>
				{searchParams.get("sr") && (
					<h1
						style={{
							fontSize: "3rem",
							fontWeight: "700",
							color: "var(--text2-color)",
						}}
					>
						نتائج البحث عن: {searchParams.get("sr")}
					</h1>
				)}
				{searchParams.get("cat") && !data?.data?.products?.category ? (
					<h1
						style={{
							fontSize: "3rem",
							fontWeight: "700",
							color: "var(--text2-color)",
						}}
					>
						القسم: {searchParams.get("cat")}
					</h1>
				) : (
					data?.data?.products?.category && (
						<h1
							style={{
								fontSize: "3rem",
								fontWeight: "700",
								color: "var(--text2-color)",
							}}
						>
							القسم: {data?.data?.products?.category}
						</h1>
					)
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
						{data?.data?.products?.products?.map((item, index) => {
							// console.log(item);
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
										category={item.category.title}
										newPrice={item.newPrice}
										oldPrice={item.oldPrice}
										title={item.title}
										slug={item.slug}
										id={item._id}
										quantity={item.quantity}
									/>
								</Col>
							);
						})}
					</Row>
				</section>
				<div className="pagination">
					<button
						className="pagination-btn"
						onClick={() => {
							if (pageNumber > 1) {
								setPageNumber(pageNumber - 1);
								if ((pageNumber - 1) % pageNumberLimit === 0) {
									setMaxPageNumberLimit(
										maxPageNumberLimit - pageNumberLimit
									);
									setMinPageNumberLimit(
										minPageNumberLimit - pageNumberLimit
									);
								}
							}
						}}
						disabled={
							isPreviousData || pageNumber === 1 ? true : false
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
								pageNumber < data?.data?.products?.productCount
							) {
								setPageNumber(pageNumber + 1);
								if (pageNumber + 1 > maxPageNumberLimit) {
									setMaxPageNumberLimit(
										maxPageNumberLimit + pageNumberLimit
									);
									setMinPageNumberLimit(
										minPageNumberLimit + pageNumberLimit
									);
								}
							}
						}}
						disabled={
							isPreviousData || pageNumber === totalPageNumber
								? true
								: false
						}
					>
						{"التالي"}
					</button>
				</div>
			</section>
		);
	}
};

export default StoreSection;
