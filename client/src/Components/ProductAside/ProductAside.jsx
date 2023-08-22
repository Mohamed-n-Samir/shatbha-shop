import Slider from "react-slider";
import { useState } from "react";
import Categories from "./Categories";
import "./product-aside.css";
import { Button, Form } from "react-bootstrap";

const ProductAside = ({
	value,
	setValue,
	MIN,
	MAX,
	setcomValue,
	setSort,
	itemsNubmer,
}) => {
	console.log(value);
	const [sortValue, setSortValue] = useState("-createdAt");

	return (
		<aside className="product-aside">
			{itemsNubmer > 0 && (
				<div className="app">
					<div className="box">
						<h3>
							فرز حسب
							<span> السعر </span>
						</h3>
						<div className="values">
							{value[1]} جنيه - {value[0]} جنيه
						</div>
						<div className="slider-container">
							<Slider
								className="slider"
								thumbClassName="thumb"
								trackClassName="track"
								value={value}
								min={MIN}
								max={MAX}
								onChange={(value) => setValue(value)}
							/>
						</div>
						<small>المدي الحالي ({value[1] - value[0]} جنيه)</small>
						<Form>
							<div className="mb-3 d-flex justify-content-around my-4 fs-5">
								<Form.Check
									type={"radio"}
									id={`high-price`}
									label={`الاعلي سعرا`}
									name="sort"
									value={"-newPrice"}
									onChange={(e) => {
										setSortValue(e.target.value);
									}}
								/>

								<Form.Check
									type={"radio"}
									label={`الاقل سعرا`}
									id={`low-price`}
									name="sort"
									value={"newPrice"}
									onChange={(e) => {
										setSortValue(e.target.value);
									}}
								/>
							</div>
						</Form>
						<Button
							variant="dark"
							className="py-2 px-3 fs-5 mt-3"
							onClick={(e) => {
								e.preventDefault();
								setcomValue(value);
								setSort(sortValue);
							}}
						>
							تصفيه
						</Button>
						<Button
							variant="danger"
							className="py-2 px-3 fs-5 mt-3 mx-3"
							onClick={(e) => {
								e.preventDefault();
								setValue([MIN, MAX]);
								setcomValue([MIN, MAX]);
								setSort("-createdAt");
							}}
						>
							الغاء التصفيه
						</Button>
					</div>
				</div>
			)}
			<div className={`box ${itemsNubmer > 0 && "mt-4"}`} >
				<h3 className="mb-5">اقسام المنتجات</h3>
				<Categories />
			</div>
		</aside>
	);
};

export default ProductAside;
