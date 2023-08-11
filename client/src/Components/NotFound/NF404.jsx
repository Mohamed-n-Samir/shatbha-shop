import "./NF404.css";
import { Link } from "react-router-dom";

const NF404 = () => {
	return (
		<div className="page404">
			<img
				className="not-found-page-img"
				src="/404(1).webp"
				alt="Error 404 Not Found"
			/>
			<Link className="btn" to={"/"}> Return to The Home Page </Link>
		</div>
	);
};

export default NF404;
