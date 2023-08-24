import useQueryCustom from "../../hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";
import { Row, Col } from "react-bootstrap";
import Card2 from "../Card2/Card2";
import { ReactComponent as Tap } from "../../assets/icons/tap.svg";
import ShowerIcon from '@mui/icons-material/Shower';


// import "./section-2.css";

const Section3 = () => {
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["shower-data"],
		"/allProductForUsers",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		},
		{
			params: {
				limit: 8,
				tags: "64dbe63d5e826e89dee86b5a",
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
					<hr style={{
                        width:"40%"
                    }}/>
					<h1 className="text-center">
						<ShowerIcon  fontSize="x-large"/>
					</h1>
					<hr style={{
                        width:"40%"
                    }}/>
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
					<hr style={{
                        width:"40%"
                    }}/>
					<h1 className="text-center">
						<ShowerIcon  fontSize="x-large" />
					</h1>
					<hr style={{
                        width:"40%"
                    }}/>
				</div>

				<div className="is-loading">
					<h2 className="text-center">!!! لا يوجد عروض حاليا</h2>
				</div>
			</section>
		);
	}

    console.log(data?.data?.products)

	if (data && data?.data?.products?.productCount > 0) {
		return (
			<section className="section-1">
				<div className="d-flex justify-content-between align-items-center">
					<hr style={{
                        width:"40%"
                    }}/>
					<h1 className="text-center">
						<ShowerIcon fontSize="x-large" />
					</h1>
					<hr style={{
                        width:"40%"
                    }}/>
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

export default Section3;
