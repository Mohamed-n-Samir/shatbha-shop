import { lazy, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./layout.css";
import LazyFooter from "../Footer/LazyFooter";
import Navbar1 from "../Navbar1/Navbar1";
import Navbar2 from "../Navbar2/Navbar2";

const GoToTop = lazy(() => import("../GoToTop/GoToTop"));

const Layout = ({
	children,
	title,
	description,
	keywords,
	author,
	ogDescription,
	ogTitle,
	ogImage,
	ogUrl,
	msapplicationTileImage,
	robots,
	canonicalUrl,
	preloadImages,
	className,
	schema,
}) => {
	// const schema = {
	// 	"@context": "https://schema.org",
	// 	"@type": "EducationalOrganization",
	// 	url: `https://www.dr-mohamed-elsayed.com${canonicalUrl}`,
	// 	logo: `https://www.dr-mohamed-elsayed.com/logo1.svg`,
	// };

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<link
						rel="shortcut icon"
						href="/samllbitmap.png"
						type="image/png"
					/>

					<link
						rel="icon"
						type="image/svg+xml"
						href="/smallbitmap.svg"
					/>

					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>

					<link rel="manifest" href="/site.webmanifest" />

					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>

					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/smallbitmap.svg"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="180x180"
						href="/smallbitmap.svg"
					/>

					<meta
						id="theme-color-meta"
						name="theme-color"
						content="black"
					/>

					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/smallbitmap.svg"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="152x152"
						href="/smallbitmap.svg"
					/>

					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href="/smallbitmap.svg"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="120x120"
						href="/smallbitmap.svg"
					/>
					<title>{title}</title>
					<meta name="description" content={description} />
					<meta name="keywords" content={keywords} />
					<meta name="author" content={author} />
					<meta property="og:description" content={ogDescription} />
					<meta property="og:title" content={ogTitle} />
					<meta
						property="og:site_name"
						content={"Shatbha Shop | شطبها شوب"}
					/>
					<link
						rel="canonical"
						href={`http://localhost:5173${canonicalUrl}`}
					/>
					{/*MS Tile - for Microsoft apps*/}
					<meta
						name="msapplication-TileImage"
						content={msapplicationTileImage}
					/>
					{/* Website to visit when clicked in fb or WhatsApp*/}
					<meta property="og:url" content={ogUrl} />
					<meta property="og:image" content={ogImage} />
					{/*Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp*/}
					<meta property="og:image:width" content="300" />
					<meta property="og:image:height" content="300" />
					<meta property="og:site_name" content="Shatbha" />
					<meta property="og:type" content="website" />
					<meta property="og:image:type" content="image/jpeg" />
					{robots ? (
						<meta
							name="robots"
							content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
						/>
					) : (
						<meta
							name="robots"
							content="noindex, follow,noarchive,nosnippet"
						/>
					)}
					{/* <script type="application/ld+json">
						{JSON.stringify(schema)}
					</script> */}
				</Helmet>
				<Navbar1 />
				<Navbar2 />
				<div className={`${className} layout-container`}>
					{children}
				</div>
				<LazyFooter />
				<Suspense>
					<GoToTop />
				</Suspense>
			</HelmetProvider>
		</>
	);
};

export default Layout;

Layout.defaultProps = {
	title: "متجر مستلزمات السباكة و أدوات صحية و أنظمة مياه - Shatbha | شطبها",
	description:
		"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه تسوق أون لاين خلاطات المياه و أحواض المطبخ و ديكور المطبخ و الحمام و أطقم المرحاض و حوض الحمام",
	keywords: "",
	author: "Mohamed Samir",
	ogDescription:
		"متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه تسوق أون لاين خلاطات المياه و أحواض المطبخ و ديكور المطبخ و الحمام و أطقم المرحاض و حوض الحمام",
	ogTitle:
		"متجر مستلزمات السباكة و أدوات صحية و أنظمة مياه - Shatbha | شطبها",
	ogImage: "smallbitmap.svg",
	ogUrl: "/",
	msapplicationTileImage: "/smallbitmap.svg",
	robots: true,
	canonicalUrl: "/",
	preloadImages: [],
};
