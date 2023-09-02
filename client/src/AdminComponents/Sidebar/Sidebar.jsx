import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import QuizIcon from "@mui/icons-material/Quiz";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CategoryIcon from '@mui/icons-material/Category';
import "./sidebar.css";

const SideBar = () => {
	const activeStyle = "text-decoration-none active-style py-3 px-3  w-100";
	return (
		<aside className="sidebar">
			<div className="top d-flex align-items-center justify-content-center">
				<span className="logo fs-1 fw-bold">Elsayed</span>
			</div>
			<div className="center p-3 fs-4">
				<ul className="sidebar-items">
					<p className="title fs-3 fw-bold">الرئيسيه</p>
					<li className="sidebar-item d-flex align-items-center ">
						<NavLink
							to="/dashboard"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-2 px-3  w-100"
							}
						>
							<DashboardIcon className="fs-2 mx-3 text-dark" />
							<span className="fs-4 fw-bold  text-body-tertiary">
								لوحه التحكم
							</span>
						</NavLink>
					</li>
					<p className="title fs-3 fw-bold">القائمة</p>

					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/users"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<PersonIcon className="fs-2 mx-3 text-dark " />
							<span className="fs-4 fw-bold  text-body-tertiary">
								المستخدمين
							</span>
						</NavLink>
					</li>
					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/admins"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<AdminPanelSettingsIcon className="fs-2 mx-3 text-dark " />
							<span className="fs-4 fw-bold  text-body-tertiary">
								المسئولين
							</span>
						</NavLink>
					</li>
					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/products"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<ProductionQuantityLimitsIcon className="fs-2 mx-3 text-dark" />
							<span className="fs-4 fw-bold  text-body-tertiary">
								المنتجات
							</span>
						</NavLink>
					</li>
					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/brands"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<BrandingWatermarkIcon className="fs-2 mx-3 text-dark" />
							<span className="fs-4 fw-bold  text-body-tertiary">
								الماركات
							</span>
						</NavLink>
					</li>
					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/categories"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<CategoryIcon className="fs-2 mx-3 text-dark" />
							<span className="fs-4 fw-bold  text-body-tertiary">
								الاقسام
							</span>
						</NavLink>
					</li>
					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/subcategories"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<CategoryIcon className="fs-2 mx-3 text-dark" />
							<span className="fs-4 fw-bold  text-body-tertiary">
								الاقسام الفرعيه
							</span>
						</NavLink>
					</li>
					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/orders"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<MonetizationOnIcon className="fs-2 mx-3 text-dark" />
							<span
								className="fs-4 fw-bold text-body-tertiary

"
							>
								الطلبات
							</span>
						</NavLink>
					</li>
					<li className="sidebar-item d-flex align-items-center">
						<NavLink
							to="/dashboard/shippingCities"
							className={({ isActive }) =>
								isActive
									? activeStyle
									: "text-decoration-none py-3 px-3  w-100"
							}
						>
							<LocalShippingIcon className="fs-2 mx-3 text-dark" />
							<span
								className="fs-4 fw-bold text-body-tertiary

"
							>
								مدن الشحن
							</span>
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="bottom d-flex align-items-center m-3">
				<div className="color-option me-3"></div>
				<div className="color-option me-3"></div>
			</div>
		</aside>
	);
};

export default SideBar;
