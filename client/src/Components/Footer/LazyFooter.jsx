import { lazy, Suspense, useState, useRef, useEffect } from "react";

const Footer = lazy(() => import("./Footer"));

const LazyFooter = () => {
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
			{isVisible ? 
				<Suspense
					fallback={
						<div className="loading-section">
						</div>
					}
				>
					<Footer />
				</Suspense>
			 : 
				<div className="loading-section">
				</div>
			}
		</div>
	);
};

export default LazyFooter;
