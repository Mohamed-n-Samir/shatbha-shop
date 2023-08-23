import { lazy, Suspense, useState, useRef, useEffect } from "react";

const Section2 = lazy(() => import("./Section2"));

const LazySection2 = () => {
	const [isVisible, setIsVisible] = useState(false);
	const Section2Ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(Section2Ref.current);

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, []);

	return (
		<div ref={Section2Ref}>
			{isVisible ? 
				<Suspense
					fallback={
						<div className="loading-section">
						</div>
					}
				>
					<Section2 />
				</Suspense>
			 : 
				<div className="loading-section">
				</div>
			}
		</div>
	);
};

export default LazySection2;
