import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";

function CarouselFade() {
	return (
		<Carousel fade>
			<Carousel.Item>
				<img
					className="d-block w-100 object-fit-cover object-position-center"
					src="https://ik.imagekit.io/shatbhashop/shatbha-shop-carousel/1.jpg"
					alt="First slide"
				/>
				{/* <Carousel.Caption>
					<h3>First slide label</h3>
					<p>
						Nulla vitae elit libero, a pharetra augue mollis
						interdum.
					</p>
				</Carousel.Caption> */}
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 object-fit-cover object-position-center"
					src="https://ik.imagekit.io/shatbhashop/shatbha-shop-carousel/2.jpg"
					alt="First slide"
				/>
				{/* <Carousel.Caption>
					<h3>Second slide label</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
				</Carousel.Caption> */}
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 object-fit-cover object-position-center"
					src="https://ik.imagekit.io/shatbhashop/shatbha-shop-carousel/3.jpg"
					alt="First slide"
				/>
				{/* <Carousel.Caption>
					<h3>Third slide label</h3>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur.
					</p>
				</Carousel.Caption> */}
			</Carousel.Item>
		</Carousel>
	);
}

export default CarouselFade;
