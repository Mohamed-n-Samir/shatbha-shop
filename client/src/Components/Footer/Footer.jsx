import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Facebook } from "../../assets/icons/facebook.svg";
import { ReactComponent as Youtube } from "../../assets/icons/youtube.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Instagram } from "../../assets/icons/instagram.svg";
import "./footer.css";

const Footer = () => {
	return (
		<footer className="footer-container container px-0">
			{/* <div className="part1 d-flex justify-content-center align-items-center gap-5 px-3 py-5">
				<div className="map">
					<iframe
						width="100%"
						height="320"
						frameBorder="0"
						scrolling="no"
						marginHeight="0"
						marginWidth="0"
						src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=30.1382579,31.3703569+(Shatbha%20Shop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
					>
						<a href="https://www.maps.ie/population/">
							Population mapping
						</a>
					</iframe>
				</div>
				<div className="qr-code w-50 d-flex justify-content-center align-items-center flex-column py-4">
					<p
						className="mb-5 text-center"
						style={{
							fontSize: "1.6rem",
							fontWeight: "bold",
						}}
					>
						أو يمكنك مسح الQR Code الخاص بنا لنقل عنوان المتجر على
						هاتفك
					</p>
					<img
						src="./shatbha-qr.png"
						className="w-50 d-block"
						alt="qr-code"
						style={{ aspectRatio: "1/1" }}
					/>
				</div>
			</div> */}

			<div style={{
					backgroundColor: "var(--bg-color)",
				}}  className="part2 d-flex justify-content-center align-items-center gap-4 py-5 mt-5">
				<div className="short-links  w-50">
					<div className="important4you">
						<h1 className=" mb-5 w-100">مهم لك:</h1>
						<ul className="list-unstyled d-flex flex-column  gap-3 text-decoration-line shortlinks">
							<li>
								<Link to={0}>الشروط والأحكام</Link>
							</li>
							<li>
								<Link to={0}>سياسة الخصوصية</Link>
							</li>
							<li>
								<Link to={0}>الأسئلة الشائعة</Link>
							</li>
							<li>
								<Link to={0}>التواصل معنا</Link>
							</li>
						</ul>
					</div>
					<div className="shortcuts ">
						<h1 className=" mb-5 w-100">اختصارات:</h1>
						<ul className="list-unstyled d-flex flex-column gap-3 shortlinks">
							<li>
								<Link to={0}>الرئيسية</Link>
							</li>
							<li>
								<Link to={0}>المتجر</Link>
							</li>
							<li>
								<Link to={0}>المدونة</Link>
							</li>
							<li>
								<Link to={0}>المنتجات</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="logo-socials d-flex justify-content-center align-items-center flex-column gap-5 w-50">
					<img className="w-50" src="./verticalLogo.svg" alt="logo" />
					<div className="socials d-flex justify-content-center align-items-center">
						<Link to={0}>
							<Facebook />
						</Link>
						<Link to={0}>
							<Youtube />
						</Link>
						<Link to={0}>
							<Twitter />
						</Link>
						<Link to={0}>
							<Instagram />
						</Link>
					</div>
				</div>
			</div>
            <div className="part3 d-flex  align-items-center flex-column">
            <p>
					Copyright &#169; {new Date().getFullYear()}{" "}
					<span>
						<strong>Shatbha Store</strong>
					</span>
				</p>
				<p>
					Developed by <span><i style={{
						fontWeight: "bold",
					}}>Nash2t</i></span>
				</p>
            </div>
		</footer>
	);
};

export default Footer;
