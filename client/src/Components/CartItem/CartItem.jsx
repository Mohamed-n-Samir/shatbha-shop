import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";

const CartItem = ({
	id,
	quantity,
	title,
	image,
	oldPrice,
	newPrice,
	quan,
	slug,
}) => {
	const { removeAllQuantity, addToCart, removeFromCart } = useShoppingCart();
	// const navigate = useNavigate();
	return (
		<Stack
			direction="horizontal"
			gap={2}
			className="d-flex align-items-center"
			style={{
				borderBottom: "1px solid #ddd",
				borderRadius: "10px",
				paddingBottom: "1rem",
			}}
		>
			<a href={`/products/${slug}`}>
				<img
					src={image}
					alt={title}
					style={{
						width: "100px",
						height: "100px",
						objectFit: "cover",
						borderRadius: "10px",
					}}
				/>
			</a>

			<div className="fs-5 ms-auto">
				<div>
					{title
						.slice(0, 100)
						.concat(title.length > 100 ? "..." : "")}

					<span className="mx-2 text-muted gap-4 d-flex fs-5 my-2">
						<Button
							onClick={() => {
								addToCart({
									id,
									title,
									oldPrice,
									newPrice,
									image,
									quan,
									slug,
								});
							}}
						>
							+
						</Button>
						x{quantity}
						<Button
							onClick={() => {
								removeFromCart(id);
							}}
						>
							-
						</Button>
					</span>

					<div
						className="d-flex align-items-center gap-2 text-muted"
						style={{
							fontSize: "1.6rem",
						}}
					>
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
					</div>
				</div>
				<div>{`EGP${(newPrice * quantity).toLocaleString(
					"en-US"
				)}.00`}</div>
			</div>
			<Button
				variant="outline-danger"
				size="lg"
				onClick={() => {
					removeAllQuantity(id);
				}}
			>
				&times;
			</Button>
		</Stack>
	);
};

export default CartItem;
