import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import ShowCategoryTable from "../../src/AdminComponents/CategoryTable/CategoryTable"
import "./category.css";

const Category = () => {
	return (
		<div className="users d-flex w-100">
			<SideBar />
			<div className="users-table-container">
				<NavBar />
				<ShowCategoryTable />
			</div>
		</div>
	);
};

export default Category;
