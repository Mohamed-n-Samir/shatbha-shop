import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import ShowOrdersTable from "../../src/AdminComponents/OrdersTable/OrdersTable"
import "./order-admin.css";

const OrderAdmin = () => {
	return (
		<div className="users d-flex w-100">
			<SideBar />
			<div className="users-table-container">
				<NavBar />
				<ShowOrdersTable />
			</div>
		</div>
	);
};

export default OrderAdmin;
