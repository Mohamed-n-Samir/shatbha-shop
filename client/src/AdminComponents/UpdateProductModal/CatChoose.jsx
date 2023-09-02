import { Form } from "react-bootstrap";
import useQueryCustom from "../../hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";

const CatChoose = ({ handleChange, categoryID }) => {
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["categories-table-data"],
		"/allCategory",
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

	if (data?.data) {
		return (
			<Form.Group controlId="category">
				<Form.Label>القسم</Form.Label>
				<Form.Select
					type="select"
					placeholder="اختر القسم"
					name="category"
					onChange={handleChange}
					className="p-3 fs-5"
					value={categoryID || "0"}
				>
					<option value="0" hidden={true}>
						اختر القسم
					</option>
					{data?.data?.map((category) => {
						return (
							category.title && (
								<option value={category._id} key={category._id}>
									{category.title}
								</option>
							)
						);
					})}
				</Form.Select>
			</Form.Group>
		);
	}
};

export default CatChoose;
