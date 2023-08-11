import { Block, Edit } from "@mui/icons-material";
import SideBar from "../../src/AdminComponents/Sidebar/Sidebar";
import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import Widget from "../../src/AdminComponents/Widget/Widget";
import Featured from "../../src/AdminComponents/Featured/Featured";
import Chart from "../../src/AdminComponents/Chart/Chart";
import "./dashboard.css";

const Dashboard = () => {
	return (
		<main className="dashboard-home d-flex">
			<SideBar />
			<div className="dashboard-home-container">
				<NavBar />
				<div className="widgets d-flex p-5 gap-3">
					<Widget type="users" />
					<Widget type="lectures" />
					<Widget type="earnings" />
					<Widget type="balance" />
				</div>
				<div className="charts py-2 px-5 fs-3 d-flex p-5 gap-5">
					<Featured />
					<Chart />
				</div>
			</div>
		</main>
	);
};

export default Dashboard;
