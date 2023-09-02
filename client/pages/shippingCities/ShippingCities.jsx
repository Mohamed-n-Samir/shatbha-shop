import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import ShowShippingCitiesTable from "../../src/AdminComponents/ShippingCitiesTable/ShippingCitiesTable"
import "./shipping-cities.css";

const ShippingCities = () => {
	return (
		<div className="users d-flex w-100">
			<SideBar />
			<div className="users-table-container">
				<NavBar />
				<ShowShippingCitiesTable />
			</div>
		</div>
	);
};

export default ShippingCities;
