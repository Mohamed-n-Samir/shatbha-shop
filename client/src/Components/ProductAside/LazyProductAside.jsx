import { lazy, Suspense, useState, useRef, useEffect } from "react";

const ProductAside = lazy(() => import("./ProductAside"));

const LazyProductAside = ({
	value,
	setValue,
	MIN,
	MAX,
	setcomValue,
	setSort,
	itemsNubmer
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const FooterRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(FooterRef.current);

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, []);

	return (
		<div ref={FooterRef}>
			{isVisible ? (
				<Suspense fallback={<div className="loading-section"></div>}>
					<ProductAside
						value={value}
						setValue={setValue}
						MIN={MIN}
						MAX={MAX}
						setcomValue={setcomValue}
						setSort={setSort}
						itemsNubmer={itemsNubmer}
					/>
				</Suspense>
			) : (
				<div className="loading-section"></div>
			)}
		</div>
	);
};

export default LazyProductAside;
