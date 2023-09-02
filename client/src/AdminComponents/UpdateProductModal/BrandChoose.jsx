import { Form } from "react-bootstrap";
import useQueryCustom from "../../hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";

const brandChoose = ({ handleChange, brandID }) => {
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["brand-table-data"],
		"/allBrands",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);


	if (isLoading || isFetching) {
		return (
			<div className="is-loading">
				<HashLoader size={30} />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="is-loading">
				<h1>something went wrong</h1>
			</div>
		);
	}

	if (!data) {
		return <h1>لا يوجد اقسام</h1>;
	}

	if (data?.data?.allBrand) {
		console.log(data?.data);
		return (
			<Form.Group controlId="brand">
				<Form.Label>الماركه</Form.Label>
				<Form.Select
					type="select"
					placeholder="اختر الماركه"
					name="brand"
					onChange={handleChange}
					className="p-3 fs-5"
					value={brandID || "0"}
				>
					<option value="0" hidden={true}>
						اختر الماركه
					</option>
					{data?.data?.allBrand?.map((brand) => {
						return (
							brand.name && (
								<option value={brand._id} key={brand._id}>
									{brand.name}
								</option>
							)
						);
					})}
				</Form.Select>
			</Form.Group>
		);
	}
};

export default brandChoose;
