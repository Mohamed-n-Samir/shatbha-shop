import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Toast } from "react-bootstrap";
import "./card2.css";

const Card2 = ({
	imgs,
	title,
	oldPrice,
	newPrice,
	category,
	slug,
	id,
	quantity: quan,
}) => {
	const [img, setImg] = useState(imgs[0].url);
	const { addToCart, getItemsQuantity, removeFromCart, removeAllQuantity } =
		useShoppingCart();
	const quantity = getItemsQuantity(id);
	return (
		<div className="card2">
			<Link to={`/products/${slug}`}>
				<div
					className="card2-imgs"
					style={{
						backgroundImage: `url(${img})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						aspectRatio: "1/1",
						transition: "all 0.5s ease-in-out",
					}}
					onMouseOver={() => {
						if (imgs[1]) setImg(imgs[1].url);
					}}
					onMouseOut={() => {
						setImg(imgs[0].url);
					}}
				></div>
				<div className="card2-text d-flex flex-column justify-content-center align-items-center">
					<h3 className="p-2 text-center my-3">{title}</h3>
					<p className="px-2 ">{category}</p>
					<h2 className="d-flex gap-4 px-2">
						{newPrice !== oldPrice ? (
							<>
								<span className="old-price">{`EGP${oldPrice.toLocaleString(
									"en-US"
								)}.00`}</span>
								{`EGP${newPrice.toLocaleString("en-US")}.00`}
							</>
						) : (
							`EGP${oldPrice.toLocaleString("en-US")}.00`
						)}
					</h2>
					<p className="px-2 ">الكمية المتبقيه : {quan - quantity}</p>
				</div>
			</Link>

			<div className="d-flex flex-column justify-content-center align-items-center gap-2 my-3">
				{quantity === 0 ? (
					<Button
						className="py-4 px-5 fs-4 btn-dark fw-bold"
						onClick={() => {
							console.log(id);
							addToCart({
								id,
								title,
								oldPrice,
								newPrice,
								image: imgs[0].url,
								quan,
								slug,
							});
						}}
					>
						إضافة إلى السلة
					</Button>
				) : (
					<>
						<div className="mb-3">
							<div className="d-flex align-items-center justify-content-center gap-3">
								<Button
									className="fs-4"
									variant="dark"
									onClick={() =>
										addToCart({
											id,
											title,
											oldPrice,
											newPrice,
											quan,
											slug,
										})
									}
								>
									+
								</Button>
								<span className="fs-3">{quantity}</span>
								<Button
									className="fs-4"
									variant="dark"
									onClick={() => removeFromCart(id)}
								>
									-
								</Button>
							</div>
						</div>
						<Button
							variant="outline-danger"
							className="py-4 px-5 fs-4 fw-bold"
							onClick={() => {
								console.log(id);
								removeAllQuantity(id);
							}}
						>
							حذف من السلة
						</Button>
					</>
				)}

				<Button
					variant="outline-dark"
					className="p-4 fs-4 fw-bold"
				>
					إضافة الى المفضلة <FavoriteBorder fontSize="large" />
				</Button>
			</div>
		</div>
	);
};

Card2.defaultProps = {
	imgs: [
		{
			url: "https://www.sebakashop.com/wp-content/uploads/2023/08/%D8%AD%D9%88%D8%B6-%D9%85%D8%B7%D8%A8%D8%AE-%D8%A7%D9%84%D8%A3%D8%B5%D9%8A%D9%84-85-51%D8%B3%D9%85-%D8%A8%D8%A7%D9%84%D8%B5%D8%B1%D9%81-6-%D8%A8%D9%88%D8%B5%D8%A9-%D9%88-%D8%A7%D9%84%D8%B3%D9%84%D8%A9-%D8%A7%D9%84%D9%83%D8%A8%D9%8A%D8%B1%D8%A9-%D9%88-%D8%A7%D9%84%D8%B5%D8%BA%D9%8A%D8%B1%D8%A9-%D9%88-%D8%AE%D8%B2%D8%A7%D9%86-%D8%A7%D9%84%D8%B5%D8%A7%D8%A8%D9%88%D9%86.jpg",
			id: "0",
		},
		{
			url: "https://www.sebakashop.com/wp-content/uploads/2023/08/%D8%AD%D9%88%D8%B6-%D9%85%D8%B7%D8%A8%D8%AE-%D8%A7%D9%84%D8%A7%D8%B5%D9%8A%D9%84-74.5-51.5-%D8%AA%D8%B1%D9%83%D9%89-%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%D9%84%D8%B3-%D8%A8%D8%A7%D9%84%D8%B5%D8%B1%D9%81-%D8%A7%D9%84%D9%81%D8%A7%D9%8A%D8%B8-%D9%88-%D8%B3%D9%84%D8%A9-%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%D9%84%D8%B3-%D9%88-%D8%AE%D8%B2%D8%A7%D9%86-%D8%B5%D8%A7%D8%A8%D9%88%D9%86-%D9%88-%D8%A7%D8%B7%D9%82%D9%85-%D8%A7%D9%84%D8%AA%D8%AB%D8%A8%D9%8A%D8%AA-300x300.jpg",
			id: "1",
		},
	],
	title: "عنوان العرض",
	oldPrice: 10000,
	newPrice: 500,
	category: "القسم",
};

export default Card2;
