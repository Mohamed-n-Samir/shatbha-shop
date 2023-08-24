import useQueryCustom from "../../hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";
import { Row, Col } from "react-bootstrap";
import Card2 from "../Card2/Card2";
import "./section-1.css";

const Section1 = () => {
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["offers-data"],
		"/getOffers",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
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
				<hr />
				<h1 className="text-center">
					عروض شطبها شوب مبتـنـتهـــيش ...
				</h1>
				<div className="is-loading">
					<h2 className="text-center">
						حدث خطأ اثناء التحميل اعد تحميل الصفحه!!!
					</h2>
				</div>
			</section>
		);
	}

	if (data && data?.data?.offers?.length === 0) {
		// console.log(data?.data?.offers)
		return (
			<section className="section-1">
				<hr />
				<h1 className="text-center">
					عروض شطبها شوب مبتـنـتهـــيش ...
				</h1>
				<div className="is-loading">
					<h2 className="text-center">!!! لا يوجد عروض حاليا</h2>
				</div>
			</section>
		);
	}

	if (data && data?.data?.offers?.length > 0) {
		console.log(data?.data?.offers);
		return (
			<section className="section-1">
				<hr />
				<h1 className="text-center my-5">
					عروض شطبها شوب مبتـنـتهـــيش ...
				</h1>
				<Row className="py-5 ">
					{data?.data?.offers?.map((item, index) => {
						return <Col
							className="mb-3 px-2"
							key={index}
							xs={6}
							lg={4}
							sm={6}
							md={6}
							xl={3}
						>
							<Card2 quantity={item.quantity} imgs={item.images} category={item.category.title} newPrice={item.newPrice} oldPrice={item.oldPrice} title={item.title} slug={item.slug} id={item._id}/>
						</Col>;
					})}
				</Row>
			</section>
		);
	}
};

export default Section1;
