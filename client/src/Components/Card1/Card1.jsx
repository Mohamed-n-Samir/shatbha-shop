import { Link } from "react-router-dom";
import "./card1.css";

const Card1 = ({...props}) => {
	return (
		<div
			style={{
				background:
					`url(${props.img}) no-repeat center center/cover`,
				aspectRatio: "1/1",
			}}
			className="card1 "
		>
			<div className="card1-text d-flex flex-column justify-content-center align-items-center gap-5">
				<h1>{props.title}</h1>
				<p>{props.desc}</p>
				<div className="card-link d-flex justify-content-end">
					<Link to={`product-category/${props.catID}`}>تسوق الآن</Link>
				</div>
			</div>
		</div>
	);
};

export default Card1;
