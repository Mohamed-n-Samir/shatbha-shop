import { Link } from "react-router-dom";
import "./navbar2.css";
import { useDataProvider } from "../../hooks/useDataProvider";
import { ReactComponent as Whats } from "../../assets/icons/whats.svg";

const Navbar2 = () => {
	const { user } = useDataProvider();
	return (
		<nav className="navbar2 px-4">
			<div className="navdiv navbar navbar-expand-lg gap-4 justify-content-center">
				<button className="btn btn-dark px-5 py-4 fs-2 fw-bold d-flex gap-3 call-us align-items-center ">
					إسألنا عبر واتساب{" "}
					<Whats
						style={{
							width: "30px",
							height: "30px",
						}}
					/>
				</button>
				<ul className="links links2">
					<li className="link link2">
						<Link to="/product-category/خلاطات المياه">
							خلاطات المياه
						</Link>
					</li>
					<li className="link link2">
						<Link to="/product-category/شاور و دش">شاور و دش</Link>
					</li>
					<li className="link link2">
						<Link to="/product-category/غطاء بلاعة">غطاء بلاعة</Link>
					</li>
					<li className="link link2">
						<Link to="/product-category/قواعد و احواض">قواعد و احواض</Link>
					</li>
					<li className="link link2">
						<Link to="/product-category/بانيوهات">بانيوهات</Link>
					</li>
					<li className="link link2">
						<Link to="/product-category/حوض المطبخ">حوض المطبخ</Link>
					</li>
					<li className="link link2">
						<Link to="/product-category/قطع و وصلات">قطع و وصلات</Link>
					</li>
					<li className="link link2">
						<Link to="/product-category/إكسسوارات">إكسسوارات</Link>
					</li>
				</ul>
				{user !== null && user !== "none" && (
					<Link
						to="/profile"
						className="user d-flex justify-content-center align-items-center gap-3  px-5 py-4 rounded"
					>
						<img
							src="/userIcon.webp"
							alt="user"
							style={{ aspectRatio: "1/1" }}
						></img>
						<h3 className="text-white">مرحبا {user.firstname}</h3>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar2;
