import { useState, useEffect } from "react";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrowup.svg";

const GoToTop = () => {
	const [showScroll, setShowScroll] = useState(false);

	const checkScrollTop = () => {
		if (window.scrollY > 400) {
			setShowScroll(true);
		} else if (window.scrollY <= 400) {
			setShowScroll(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", checkScrollTop);
		return () => {
			window.removeEventListener("scroll", checkScrollTop);
		};
	}, []);

	return (
		<>
			{showScroll && (
				<button
					style={{
						position: "fixed",
						bottom: "1rem",
						left: "1rem",
						zIndex: "1000",
						backgroundColor: "white",
						border: "none",
						outline: "none",
						cursor: "pointer",
						color: "var(--black-color)",
						borderRadius: "50%",
                        transition: "all 0.3s ease-in-out",
					}}
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					<ArrowUp
						style={{
							width: "3rem",
							height: "3rem",
						}}
					/>
				</button>
			)}
		</>
	);
};

export default GoToTop;
