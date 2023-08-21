import "./sub-category-comp.css";
import { Form, Button, Row } from "react-bootstrap";
import { useState } from "react";
import CatChoose from "./CatChoose";
import SubCatLoop from "./SubCatLoop";

const SubCategoryComp = () => {
	const [selectedCategory, setSelectedCategory] = useState("");

	const handleChange = (e) => {
		console.log(e.target.value);
		setSelectedCategory(e.target.value);
	};

	const handleSubmit = () => {
		console.log();
	};

	return (
		<section className="sub-category w-100 p-4 d-flex flex-column justify-content-center ">
			<div>
				<h1 className="text-center head d-flex w-100 justify-content-center align-items-center mb-4 gap-3">
					الاقسام الفرعيه
				</h1>
				<div>
					<div className="d-flex justify-content-center flex-column gap-3 ">
						<div className="category w-100 choose-cat">
							<h2 className="text-center">اختر القسم</h2>
							<CatChoose
								handleChange={handleChange}
								setSelectedCategory={setSelectedCategory}
							/>
						</div>
						<div className="sub-category choose-cat">
							<h2 className="text-center">الاقسام الفرعيه</h2>
							{selectedCategory && (
								<SubCatLoop categoryID={selectedCategory} />
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SubCategoryComp;
