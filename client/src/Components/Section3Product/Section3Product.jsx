import useQueryCustom from "../../hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";
import { Row, Col } from "react-bootstrap";
import Card2 from "../Card2/Card2";
import { ReactComponent as Tap } from "../../assets/icons/tap.svg";

// import "./section-2.css";

const Section3Product = ({ tag }) => {
    console.log(tag)
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["tabs-data",tag],
		"/allProductForUsers",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		},
		{
			params: {
				limit: 4,
				tags: tag,
			},
		}
	);

	if (isLoading || isFetching) {
		return (
			<div className="loading-section is-loading ">
				<HashLoader size={40} />
			</div>
		);
	}

	if (isError) {
		return (
			<section className="section-1">
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="pt-5 text-center w-100">منتجات ذات صله</h1>
				</div>
				<div className="is-loading">
					<h2 className="text-center">
						حدث خطأ اثناء التحميل اعد تحميل الصفحه!!!
					</h2>
				</div>
			</section>
		);
	}

	if (data && data?.data?.products?.productCount === 0) {
		return (
			<section className="section-1">
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="pt-5 text-center w-100">منتجات ذات صله</h1>
				</div>

				<div className="is-loading">
					<h2 className="text-center">!!! لا يوجد عروض حاليا</h2>
				</div>
			</section>
		);
	}

	console.log(data?.data?.products);

	if (data && data?.data?.products?.productCount > 0) {
		return (
			<section className="section-1 container">
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="pt-5 text-center w-100">منتجات ذات صله</h1>
				</div>
				<Row className="py-5 ">
					{data?.data?.products?.products?.map((item, index) => {
						return (
							<Col
								className="mb-3 px-2"
								key={index}
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
		);
	}
};

export default Section3Product;
