import Card1 from "../Card1/Card1";
import { Row, Col } from "react-bootstrap";

const CardsContainer = () => {
	return (
		<section className="container pt-4 pb-5">
			<Row>
				<Col lg={4} sm={12} md={6} className="mt-4">
					<Card1
						title={"بتأسس ؟"}
						desc={
							"أكبر تشكيلة من الديكورات العصرية لحمامك أو مطبخك بأفضل الأسعار"
						}
						img={"./مواسير-بلاستيك-1024x682.jpg"}
					/>
				</Col>

				<Col lg={4} sm={12} md={6} className="mt-4">
					<Card1
						title={"بتشطب ؟"}
						desc={
							"أكبر تشكيلة من أفضل المنتجات تناسب جميع الأذواق و بسعر مناسب"
						}
						img={"./pexels-victoria-borodinova-3315291-1-1.webp"}
					/>
				</Col>
				<Col lg={4} sm={12} md={6} className="mt-4">
					<Card1
						title={"ديكور ؟"}
						desc={
							"أكبر تشكيلة من الديكورات العصرية لحمامك أو مطبخك بأفضل الأسعار"
						}
						img={"./pexels-mathias-reding-7664072.jpg"}
					/>
				</Col>
			</Row>
		</section>
	);
};

export default CardsContainer;
