import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import ShowAdminTable from "../../src/AdminComponents/AdminTable/AdminTable"
import "./admins.css";

const Users = () => {
	return (
		<div className="admins d-flex w-100">
			<SideBar />
			<div className="admins-table-container">
				<NavBar />
				<ShowAdminTable />
			</div>
		</div>
	);
};

export default Users;
