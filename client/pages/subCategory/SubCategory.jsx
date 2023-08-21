import NavBar from "../../src/AdminComponents/NavBar/NavBar";
import SideBar from "../../src/AdminComponents/SideBar/SideBar";
import SubCategoryComp from "../../src/AdminComponents/SubCategoryComp/SubCategoryComp"
import "./sub-category.css";

const SubCategory = () => {
	return (
		<div className="users d-flex w-100">
			<SideBar />
			<div className="users-table-container">
				<NavBar />
				<SubCategoryComp />
			</div>
		</div>
	);
};

export default SubCategory;
