import { createContext, useState, useContext, useEffect } from "react";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";
import { toast } from "react-toastify";

const ShoppingCartContext = createContext({});

const initialCartItems = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const ShoppingCartProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useState(initialCartItems);

	useEffect(() => {
		const cartItems = JSON.parse(localStorage.getItem("cartItems"));
		if (cartItems) {
			setCartItems(cartItems);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);
	const getItemsQuantity = (id) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};
	const addToCart = ({ id, title, oldPrice, newPrice, image, quan,slug }) => {
		console.log(quan);
		if (quan > getItemsQuantity(id)) {
			setCartItems((prev) => {
				const isItemInCart = prev.find((i) => i.id === id);
				if (isItemInCart) {
					return prev.map((i) =>
						i.id === id ? { ...i, quantity: i.quantity + 1 } : i
					);
				}
				return [
					...prev,
					{ id, title, oldPrice, newPrice, image, quantity: 1,quan,slug },
				];
			});
		} else {
			toast.error("لا يوجد كمية كافية من هذا المنتج", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};
	const removeFromCart = (id) => {
		setCartItems((prev) =>
			prev.reduce((acc, item) => {
				if (item.id === id) {
					if (item.quantity === 1) return acc;
					return [...acc, { ...item, quantity: item.quantity - 1 }];
				} else {
					return [...acc, item];
				}
			}, [])
		);
	};
	const removeAllQuantity = (id) => {
		setCartItems((prev) =>
			prev.reduce((acc, item) => {
				if (item.id === id) {
					return acc;
				} else {
					return [...acc, item];
				}
			}, [])
		);
	};

	const clearCart = () => {
		setCartItems([]);
		localStorage.removeItem("cartItems")
	};

	const getCartTotal = () => {
		return cartItems.reduce(
			(acc, item) => acc + item.newPrice * item.quantity,
			0
		);
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				getItemsQuantity,
				clearCart,
				getCartTotal,
				removeAllQuantity,
				openCart,
				closeCart,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
};

export default ShoppingCartProvider;

export const useShoppingCart = () => useContext(ShoppingCartContext);
