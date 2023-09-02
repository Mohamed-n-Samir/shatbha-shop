import { Navigate } from "react-router-dom";
import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { Tab, Tabs } from "react-bootstrap";
import AccountDetails from "../../src/Components/AccountDetails/AccountDetails";

const Profile = () => {
	window.scrollTo(0, 0);

	const { user } = useDataProvider();

	if (user === "none" || !user) {
		return <Navigate to="/login" replace={true} />;
	} else {
		return (
			<Layout
				robots={false}
				canonicalUrl={`/profile`}
				ogUrl={`/profile`}
				ogTitle={"الحساب الشخصي - Shatbha Shop | شطبها شوب"}
				ogDescription={
					"الحساب الشخصي في متجر شطبها شوب لتتمكن من إدارة طلباتك و المنتجات و معلوماتك الشخصية"
				}
				title={"الحساب الشخصي - Shatbha Shop | شطبها شوب"}
				description={
					"الحساب الشخصي في متجر شطبها شوب لتتمكن من إدارة طلباتك و المنتجات و معلوماتك الشخصية"
				}
				ogImage={"smallbitmap.svg"}
				msapplicationTileImage={"smallbitmap.svg"}
				author={"Shatbha Shop | شطبها شوب"}
				keywords={
					"الحساب الشخصي, متجر مستلزمات السباكة و الأدوات الصحية و أنظمة المياه, خلاطات المياه, أحواض المطبخ, ديكور المطبخ, الحمام, أطقم المرحاض, حوض الحمام"
				}
			>
				<header className=" bg-secondary py-5">
					<div
						style={{ minHeight: "25rem" }}
						className="container d-flex justify-content-around align-items-center"
					>
						<h1
							style={{
								fontSize: "4rem",
								fontWeight: "bolder",
								color: "white",
							}}
						>
							الحساب الشخصي
						</h1>
					</div>
				</header>
				<main className="container">
					<Tabs
						defaultActiveKey="account-details"
						id="tab-example"
						className="my-5 fs-2 "
					>
						<Tab
							eventKey="account-details"
							title="تفاصيل الحساب"
						>
							<AccountDetails/>
						</Tab>
						{/* <Tab eventKey="reviews" title="العنوان">
							<p className="fs-3">
								لا يوجد مراجعات حتى الآن.
								<br />
								<br />
								يسمح فقط للزبائن مسجلي الدخول الذين قاموا بشراء
								هذا المنتج ترك مراجعة.
							</p>
						</Tab> */}
					</Tabs>
				</main>
			</Layout>
		);
	}
};

export default Profile;
