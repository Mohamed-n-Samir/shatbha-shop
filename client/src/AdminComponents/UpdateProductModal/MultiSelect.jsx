import { Select } from "react-dropdown-select";
import useQueryCustom from "../../hooks/useQueryCustom";

const MultiSelect = ({ handleChange }) => {
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["tegs-table-data"],
		"/getAllSubCategory",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	if (isLoading) {
		return <div>loading...</div>;
	}
	if (isError) {
		return <div>error...</div>;
	}
	if (data?.data?.subCategories) {
		const options = data?.data?.subCategories;
		return (
			<Select
				options={options}
				name="tags"
				onChange={handleChange}
				multi
				placeholder="اختر القسم الفرعي"
				loading={isLoading}
				required={true}
				direction={"rtl"}
			/>
		);
	}
};

export default MultiSelect;
