import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import ShowProductsTable from "../../src/AdminComponents/ProductTable/ProductTable"
import "./products.css";

const Users = () => {
	return (
		<div className="products d-flex w-100">
			<SideBar />
			<div className="products-table-container">
				<NavBar />
				<ShowProductsTable />
			</div>
		</div>
	);
};

export default Users;
