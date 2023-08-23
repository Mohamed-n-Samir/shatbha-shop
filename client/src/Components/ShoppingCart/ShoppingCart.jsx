import { Offcanvas,Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";

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
			<Offcanvas.Body>
                {cartItems.length === 0 && <h3 className="text-center position-relative" style={{
                    top: "40%"
                }}>العربه فارغه</h3>}
				<Stack gap={3}>
					{cartItems?.map((item) => (
						<CartItem key={item.id} {...item} />
					))}
                    {getCartTotal() > 0 && (
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="fs-4">المجموع</h3>
                            <h3 className="fs-4">{`EGP${getCartTotal().toLocaleString(
                                "en-US"
                            )}.00`}</h3>
                        </div>
                    )}
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ShoppingCart;
