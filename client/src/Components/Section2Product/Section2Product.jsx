import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

const Section2Product = ({ description }) => {
	return (
		<section className="container">
			<Tabs
				defaultActiveKey="description"
				id="tab-example"
				className="my-5 fs-2 "
			>
				<Tab eventKey="description" title="الوصف">
					<pre
						style={{
							fontFamily: "inherit",
							fontSize: "1.8rem",
							wordWrap: "break-word",
							whiteSpace: "pre-wrap",
						}}
					>
						{extractTextBetweenTags(description).map((text, i) => {
							if (text.startsWith("(b)")) {
								return (
									<h1 key={i} className="">
										{text.slice(3, text.length - 4)}
									</h1>
								);
							}
							return <p key={i}>{text}</p>;
						})}
					</pre>
					<div
						style={{
							borderRight: "5px solid #aaa",
							width: "90%",
							margin: "auto",
							padding: "4rem",
							fontSize: "1.8rem",
						}}
					>
						تضمن شركة Shatbha هذا المنتج من حيث الجودة و ان قطع غيار
						المنتج متوفرة دائما سواء لدينا أو لدى جميع التجار و
						الموزعين للمزيد من المعلومات يرجى{" "}
						<Link to={"/contact-us"}>التواصل معنا</Link>
						<span className="d-block py-5">
							كما ان المنتج اثبت كفاءة عالية لدى جميع عملائنا و
							مستخدميه
						</span>
						<span className="d-block">
							تنصح شركة Shatbha دائما باتياع عادات ترشيد و منع
							اهدار المياه و هو ما تحاول تحقيقة فى جميع المنتجات
							المعروضة لدينا
						</span>
					</div>
				</Tab>
				<Tab eventKey="reviews" title={`مراجعات (${0})`}>
					<p className="fs-3">
						لا يوجد مراجعات حتى الآن.
						<br />
						<br />
						يسمح فقط للزبائن مسجلي الدخول الذين قاموا بشراء هذا
						المنتج ترك مراجعة.
					</p>
				</Tab>
			</Tabs>
		</section>
	);
};

export default Section2Product;

function extractTextBetweenTags(inputString) {
	const startTag = "(b)";
	const endTag = "(/b)";
	let absStart = 0;
	const extractedTexts = [];
	let startIndex = inputString.indexOf(startTag);

	while (startIndex !== -1) {
		const endIndex = inputString.indexOf(
			endTag,
			startIndex + startTag.length
		);

		if (endIndex === -1) {
			// End tag not found, break the loop
			break;
		}
		const extractedText1 = inputString.slice(absStart, startIndex);
		extractedTexts.push(extractedText1);

		const extractedText2 = inputString
			.slice(startIndex, endIndex + endTag.length)
			.trim();
		extractedTexts.push(extractedText2);

		startIndex = inputString.indexOf(startTag, endIndex + endTag.length);
		absStart = endIndex + endTag.length;
	}
	extractedTexts.push(inputString.slice(absStart, inputString.length));

	return extractedTexts;
}
