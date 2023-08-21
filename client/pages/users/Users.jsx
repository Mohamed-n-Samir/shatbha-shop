import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import ShowUsersTable from "../../src/AdminComponents/UsersTable/UsersTable"
import "./users.css";

const Users = () => {
	return (
		<div className="users d-flex w-100">
			<SideBar />
			<div className="users-table-container">
				<NavBar />
				<ShowUsersTable />
			</div>
		</div>
	);
};

export default Users;
