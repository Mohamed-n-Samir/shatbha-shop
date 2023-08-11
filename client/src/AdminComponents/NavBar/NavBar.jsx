import "./navbar.css";
import SearchOutLinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const NavBar = () => {
	return (
		<div className="dash-navbar d-flex align-items-center fs-4 px-5">
			<div className="wrapper d-flex align-items-center justify-content-between w-100">
				<div className="search d-flex align-items-center py-2 px-3">
					<input type="text" placeholder="بحث..." />
					<SearchOutLinedIcon className=" fs-3" />
				</div>
				<div className=" d-flex align-items-center gap-5">
					<div className=" d-flex align-items-center">
						<DarkModeOutlinedIcon className=" fs-1" />
					</div>
					<div className=" d-flex align-items-center">
						<AdminPanelSettingsOutlinedIcon className="fs-1" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
