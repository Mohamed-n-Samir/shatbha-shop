import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { ToastContainer } from "react-toastify";

const ShoppingCart = ({ isOpen }) => {
	const {
		cartItems,
		addToCart,
		removeFromCart,
		getItemsQuantity,
		clearCart,
		getCartTotal,
		removeAllQuantity,
		closeCart,
		openCart,
	} = useShoppingCart();
	return (
		<Offcanvas
			show={isOpen}
			onHide={closeCart}
			style={{
				zIndex: 9999,
			}}
			backdropClassName="zIndex-9999"
		>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
				progress={undefined}
				theme="dark"
			/>
			<Offcanvas.Header
				closeButton
				style={{
					fontSize: "1.6rem",
				}}
			>
				<Offcanvas.Title
					style={{
						fontSize: "1.6rem",
					}}
				>
					العربه
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="d-flex flex-column align-items-between justify-content-between">
				{cartItems.length === 0 && (
					<h3
						className="text-center "
						style={{
							top: "40%",
						}}
					>
						العربه فارغه
					</h3>
				)}
				<Stack
					gap={3}
					style={{ overflowY: "auto", overflowX: "hidden" }}
				>
					{cartItems?.map(
						(item, index) => (
							console.log(item),
							(<CartItem key={index} {...item} />)
						)
					)}
				</Stack>
				{cartItems.length > 0 && (
					<Stack
						gap={3}
						className="justify-content-center py-4"
						style={{
							flex: "0",
						}}
					>
						{getCartTotal() > 0 && (
							<div className="d-flex justify-content-between align-items-center">
								<h2 className="fs-4">المجموع</h2>
								<h2 className="fs-4">{`EGP${getCartTotal().toLocaleString(
									"en-US"
								)}.00`}</h2>
							</div>
						)}
						<Button
							variant="danger py-3 px-5 fs-4 w-75 align-self-center"
							style={{
								borderRadius: "2rem",
							}}
							onClick={() => {
								clearCart();
							}}
						>
							حذف الكل
						</Button>
						<a href="/checkout" className="d-flex justify-content-center align-items-center" style={{
							textDecoration: "none"
						}}>
							<Button
								variant="dark py-3 px-5 fs-4 w-75 align-self-center text-decoration-none"
								style={{
									borderRadius: "2rem",
								}}
								onClick={() => {}}
							>
								اتمام الطلب
							</Button>
						</a>
						{/* <Button
						variant="outline-dark py-3 px-5 fs-4 w-75 align-self-center"
						style={{
							borderRadius: "2rem",
						}}
						onClick={() => {
							clearCart();
						}}
					>
						حفظ السله
					</Button> */}
					</Stack>
				)}
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ShoppingCart;
