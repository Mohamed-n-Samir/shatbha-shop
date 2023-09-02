import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation, Link } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import Search from "../Search/Search";
import { ReactComponent as Cart } from "../../assets/icons/cart.svg";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import "./navbar1.css";
import { Button } from "react-bootstrap";

const Navbar1 = () => {
	// const isLargeScreen = useMediaQuery({
	// 	query: "(min-width: 950px)",
	// });

	const { cartItems, openCart } = useShoppingCart();

	let activeStyle = "active-style";

	const { pathname } = useLocation();
	const isActive = ["/", "/home"].includes(pathname);

	const [clicked, setClicked] = useState(false);

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
								to="/product-category/64dbec41fe92923b352651e7"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								تأسيس
							</NavLink>
						</li>
						<li className="link">
							<NavLink
								to="/product-category/64daa81fa29f411cd39e4251"
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
							<DropDown  />
						</li>
						<li className="link ">
							<Button
								variant="white"
								className="position-relative"
								onClick={openCart}
							>
								{cartItems.length > 0 && (
									<div className="cart-quantity position-absolute d-flex justify-content-center align-items-center ">
										{cartItems.length}
									</div>
								)}
								<Cart
									style={{
										fontSize: "1.4rem",
									}}
								/>
							</Button>
						</li>
					</ul>
					<Search />
				</div>
			</nav>
		</>
	);
	// }
};

export default Navbar1;
