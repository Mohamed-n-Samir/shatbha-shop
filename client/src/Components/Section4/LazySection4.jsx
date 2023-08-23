import { lazy, Suspense, useState, useRef, useEffect } from "react";

const Section4 = lazy(() => import("./Section4"));

const LazySection4 = () => {
	const [isVisible, setIsVisible] = useState(false);
	const Section4Ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(Section4Ref.current);

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, []);

	return (
		<div ref={Section4Ref}>
			{isVisible ? 
				<Suspense
					fallback={
						<div className="loading-section">
						</div>
					}
				>
					<Section4 />
				</Suspense>
			 : 
				<div className="loading-section">
				</div>
			}
		</div>
	);
};

export default LazySection4;
