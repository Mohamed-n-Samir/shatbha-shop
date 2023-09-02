import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import Section1Product from "../../src/Components/Section1Product/Section1Product";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useQueryCustom from "../../src/hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../src/context/ShoppingCartContext";
import { ReactComponent as Whats } from "../../src/assets/icons/whats.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Section2Product from "../../src/Components/Section2Product/Section2Product";
import Section3Product from "../../src/Components/Section3Product/Section3Product";
import "./product.css";

const Product = () => {
	window.scrollTo(0, 0);

	const { slug } = useParams();
	const [image, setImage] = useState(null);
	const navigate = useNavigate();

	const { addToCart, removeFromCart, getItemsQuantity, removeAllQuantity } =
		useShoppingCart();
	const { data, isError, isFetching, isLoading, refetch, isPreviousData } =
		useQueryCustom([`product-data`, slug], `getaProduct/${slug}`, {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		});

	useEffect(() => {
		if (data?.data?.images[0]?.url) {
			setImage(data?.data?.images[0]?.url);
		}
	}, [data?.data]);

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
				robots={false}
				canonicalUrl={`/products`}
				ogUrl={`/products`}
				className={"py-5"}
			>
				<section className="d-flex flex-column gap-5 store-section">
					<div className="is-loading">
						<h2 className="text-center">
							حدث خطأ اثناء التحميل اعد تحميل الصفحه!!!
						</h2>
					</div>
				</section>
			</Layout>
		);
	}

	if (data?.data) {
		const {
			_id: id,
			title,
			oldPrice,
			newPrice,
			category,
			slug,
			images,
			description,
			tags,
			quantity: quan,
			brand,
		} = data?.data;

		return (
			<Layout
				robots={true}
				canonicalUrl={`/products/${slug}`}
				ogUrl={`/products/${slug}`}
				ogTitle={`${title} - Shatbha Shop | شطبها شوب`}
				ogDescription={description.slice(0, 165) + "..."}
				title={`${title} - Shatbha Shop | شطبها شوب`}
				description={description.slice(0, 165) + "..."}
				ogImage={images[0].url}
				msapplicationTileImage={images[0].url}
				author={"Shatbha Shop | شطبها شوب"}
				keywords={tags.join(",")}
				preloadImages={images.map((img) => img.url)}
				className={"py-5"}
			>
				<main>
					<section className="container">
						<Row className="sec1-row">
							<Col lg={6} md={12} className="w-50 col-1">
								<div
									className="img-container p-1"
									style={{
										width: "85%",
										overflow: "hidden",
										borderRadius: "2rem",
									}}
								>
									{window.innerWidth < 991 ? (
										<TransformWrapper
											defaultScale={1}
											defaultPositionX={200}
											defaultPositionY={100}
										>
											<TransformComponent>
												<img
													className="mb-4 w-100"
													src={image}
													alt="image"
													style={{
														aspectRatio: "1/1",
														objectFit: "cover",
														borderRadius: "2rem",
														display: "block",
														boxShadow:
															"0rem 0rem .2em rgba(0,0,0,.3)",
														transformOrigin:
															"center",
													}}
												/>
											</TransformComponent>
										</TransformWrapper>
									) : (
										<img
											className="mb-4 w-100"
											src={image}
											alt="image"
											style={{
												aspectRatio: "1/1",
												objectFit: "cover",
												borderRadius: "2rem",
												display: "block",
												boxShadow:
													"0rem 0rem .2em rgba(0,0,0,.3)",
												transformOrigin: "center",
											}}
											onMouseMove={(e) => {
												if (window.innerWidth > 992) {
													const x =
														e.clientX -
														e.target.offsetLeft;
													const y =
														e.clientY -
														e.target.offsetTop;
													e.target.style.transformOrigin = `${x}px ${y}px`;
													e.target.style.transform = `scale(2)`;
												}
											}}
											onMouseLeave={(e) => {
												if (window.innerWidth > 992) {
													e.target.style.transformOrigin = `center`;
													e.target.style.transform = `scale(1)`;
												}
											}}
										/>
									)}
								</div>
								<div
									className="all-imgs-container d-flex gap-3 w-100 flex-wrap mt-3"
									style={{
										height: "10rem",
									}}
								>
									{data?.data?.images.map((img) => {
										return (
											<div
												key={img.id}
												className="image-container h-100"
												style={{
													backgroundImage: `url(${img.url})`,
													backgroundSize: "cover",
													backgroundPosition:
														"center",
													backgroundRepeat:
														"no-repeat",
													aspectRatio: "1/1",
													transition:
														"all 0.2s ease-in-out",
													cursor: "pointer",
												}}
												onClick={() => {
													setImage(img.url);
												}}
											></div>
										);
									})}
								</div>
							</Col>
							<Col
								lg={6}
								md={12}
								className="d-flex flex-column gap-5"
							>
								<h1
									style={{
										fontSize: "3rem",
										marginBottom: "1rem",
									}}
								>
									{title}
								</h1>
								<h2 className="d-flex gap-4 px-2">
									{newPrice !== oldPrice ? (
										<>
											<span className="old-price">{`EGP${oldPrice.toLocaleString(
												"en-US"
											)}.00`}</span>
											{`EGP${newPrice.toLocaleString(
												"en-US"
											)}.00`}
										</>
									) : (
										`EGP${oldPrice.toLocaleString(
											"en-US"
										)}.00`
									)}
								</h2>
								<div className="d-flex justify-content-between align-items-center gap-5 pb-5">
									{getItemsQuantity(id) > 0 && (
										<div className="adder-sub d-flex">
											<div
												className=" fs-3 px-4 py-2"
												style={{
													borderTop:
														"1px solid var(--text2-color)",
													borderRight:
														"1px solid var(--text2-color)",
													borderBottom:
														"1px solid var(--text2-color)",
													cursor: "pointer",
													userSelect: "none",
												}}
												onClick={() =>
													removeFromCart(id)
												}
											>
												-
											</div>
											<div
												className="px-4 py-2 fs-3"
												style={{
													border: "1px solid var(--text2-color)",
													borderRadius: "50%",
												}}
											>
												{getItemsQuantity(id)}
											</div>
											<div
												className="px-4 py-2 fs-3"
												style={{
													borderTop:
														"1px solid var(--text2-color)",
													borderLeft:
														"1px solid var(--text2-color)",
													borderBottom:
														"1px solid var(--text2-color)",
													cursor: "pointer",
													userSelect: "none",
												}}
												onClick={() => {
													addToCart({
														id,
														title,
														oldPrice,
														newPrice,
														image: images[0].url,
														quan,
														slug,
													});
												}}
											>
												+
											</div>
										</div>
									)}
									{getItemsQuantity(id) === 0 ? (
										<Button
											variant="dark py-3 px-5 fs-4 w-75"
											style={{
												borderRadius: "2rem",
											}}
											onClick={() => {
												addToCart({
													id,
													title,
													oldPrice,
													newPrice,
													image: images[0].url,
													quan,
													slug,
												});
											}}
										>
											إضافة إلى السلة
										</Button>
									) : (
										<Button
											variant="outline-danger py-3 px-5 fs-4 w-75"
											style={{
												borderRadius: "2rem",
											}}
											onClick={() => {
												removeAllQuantity(id);
											}}
										>
											حذف من السلة
										</Button>
									)}
								</div>
								<div className="d-flex flex-column gap-3">
									<hr />
									<p className="fs-4 m-0">
										التصنيف:{" "}
										<Link
											to={`/products?cat=${category._id}`}
										>
											{category.title}
										</Link>
									</p>
									<p className="fs-4">
										الوسوم:{" "}
										{tags?.map((tag, index) => {
											return (
												<span key={index}>
													{" "}
													<Link
														to={`/products?cat=${tag}`}
													>
														{tag}
													</Link>{" "}
													{index === tags.length - 1
														? ""
														: ","}
												</span>
											);
										})}
									</p>
								</div>
								<hr />
								<div className="d-flex flex-column gap-5 justify-content-center align-items-center">
									<h3 className="text-center">
										للإستفسار عن المنتج لا تتردد كلمنا حالا
										على واتساب :
									</h3>
									<Button variant="dark py-3 px-5 w-50 fs-3">
										واتساب{" "}
										<Whats
											style={{
												width: "3rem",
												height: "fit-content",
												marginRight: ".4rem",
											}}
										/>
									</Button>
								</div>
								<hr />
							</Col>
						</Row>
						<div className="d-flex align-items-center gap-4 my-5">
							<h1 className="">مشاركة على: </h1>
							<Button
								variant="d-flex align-items-center fs-3 fw-bold text-white px-4"
								style={{
									backgroundColor: "#3262c9",
								}}
								onClick={() => {
									window.open(
										`https://www.facebook.com/share.php?u=${window.location.href}`,
										"",
										"toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
									);
								}}
							>
								Facebook
							</Button>
						</div>
					</section>
					<Section2Product description={description} brand={brand} />
					<Section3Product
						tag={tags[Math.floor(Math.random() * tags.length)]}
					/>
				</main>
			</Layout>
		);
	}
};

export default Product;
