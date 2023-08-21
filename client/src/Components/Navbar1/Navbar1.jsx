import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation, Link } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import Search from "../Search/Search";
import { ReactComponent as Cart } from "../../assets/icons/cart.svg";
import "./navbar1.css";

const Navbar1 = () => {
	// const isLargeScreen = useMediaQuery({
	// 	query: "(min-width: 950px)",
	// });

	let activeStyle = "active-style";

	const { pathname } = useLocation();
	const isActive = ["/", "/home"].includes(pathname);

	const [clicked, setClicked] = useState(false);
	// const { logout, loading } = useLogout();
	// if (loading) {
	// 	return (
	// 		<div className="is-page-loading">
	// 			<PropagateLoader color="#6600cc" />
	// 		</div>
	// 	);
	// } else {

	return (
		<>
			<nav className="navbar1 ">
				<div className="container navdiv navbar navbar-expand-lg">
					<Link to={"/"}>
						<img
							src="/colLogo.svg"
							alt="logo"
							style={{ aspectRatio: "16/6" }}
						></img>
					</Link>
					<ul className="links">
						<li className="link">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								الرئيسية
							</NavLink>
						</li>
						<li className="link">
							<NavLink
								to="/blogs"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								تأسيس
							</NavLink>
						</li>
						<li className="link">
							<NavLink
								to="/lectures"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								تشطيب
							</NavLink>
						</li>
						<li className="link">
							<NavLink
								to="/products"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								المتجر
							</NavLink>
						</li>
						<li className="link">
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								حسابي
							</NavLink>
						</li>
						<li
							style={{
								padding: "0 0 0 1.5rem",
							}}
						>
							<DropDown title={"حسابي"} />
						</li>
						<li className="link">
							<NavLink
								to="/cart"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								<Cart />
							</NavLink>
						</li>
					</ul>
					<Search/>

				</div>
			</nav>
		</>
	);
	// }
};

export default Navbar1;
