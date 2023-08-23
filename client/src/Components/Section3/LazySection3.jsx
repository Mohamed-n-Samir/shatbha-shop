import { lazy, Suspense, useState, useRef, useEffect } from "react";

const Section3 = lazy(() => import("./Section3"));

const LazySection3 = () => {
	const [isVisible, setIsVisible] = useState(false);
	const Section3Ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(Section3Ref.current);

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, []);

	return (
		<div ref={Section3Ref}>
			{isVisible ? 
				<Suspense
					fallback={
						<div className="loading-section">
						</div>
					}
				>
					<Section3 />
				</Suspense>
			 : 
				<div className="loading-section">
				</div>
			}
		</div>
	);
};

export default LazySection3;
