import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import ShowBrandsTable from "../../src/AdminComponents/BrandsTable/BrandsTable"
import "./brands.css";

const Brands = () => {
	return (
		<div className="users d-flex w-100">
			<SideBar />
			<div className="users-table-container">
				<NavBar />
				<ShowBrandsTable />
			</div>
		</div>
	);
};

export default Brands;
