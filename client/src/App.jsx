import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";

import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Root from "./Components/Root/Root";

const Home = lazy(() => import("../pages/home/Home"));
const NF404 = lazy(() => import("../pages/notFound/NF404"));
const Register = lazy(() => import("../pages/register/Register"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Login = lazy(() => import("../pages/login/Login"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Users = lazy(() => import("../pages/users/Users"));
const Admins = lazy(() => import("../pages/admins/Admins"));
const Products = lazy(() => import("../pages/products/Products"));
const Category = lazy(() => import("../pages/category/Category"));
const Brands = lazy(() => import("../pages/brands/Brands"));
const SubCategory = lazy(() => import("../pages/subCategory/SubCategory"));
const Store = lazy(() => import("../pages/store/Store"));
const Search = lazy(() => import("../pages/search/Search"));
const PrivateRoute = lazy(() => import("./utils/PrivateRoute/PrivateRoute"));

function App() {
	return (
		<Routes>
			<Route path={"/"} element={<Root />}>
				<Route index element={<Home />} />
				<Route path="register" element={<Register />} exact />
				<Route path="profile" element={<Profile />} exact />
				<Route path="search/:searchString" element={<Search />} exact />
				<Route path="login" element={<Login />} exact />
				<Route path="products" exact>
					<Route index element={<Store />} />
					{/* <Route path=":slug" element={<Login />} exact /> */}
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="dashboard" element={<Dashboard />} exact />
					<Route path="dashboard/users" element={<Users />} exact />
					<Route path="dashboard/admins" element={<Admins />} exact />
					<Route
						path="dashboard/products"
						element={<Products />}
						exact
					/>
					<Route path="dashboard/brands" element={<Brands />} exact />
					<Route
						path="dashboard/categories"
						element={<Category />}
						exact
					/>
					<Route
						path="dashboard/subCategories"
						element={<SubCategory />}
						exact
					/>
				</Route>
			</Route>
			<Route path="*" element={<NF404 />} exact>
				<Route path="404" element={<NF404 />} exact />
			</Route>
		</Routes>
	);
}

export default App;
