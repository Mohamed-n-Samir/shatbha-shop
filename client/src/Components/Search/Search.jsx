import { useState } from "react";
import useQueryCustom from "../../hooks/useQueryCustom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/searchIcon.svg";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");
	const debouncedSearch = useDebounce(searchValue, 200);
	const { data, isError, isFetching, isLoading, refetch, isPreviousData } =
		useQueryCustom(
			["search-data", debouncedSearch],
			"/allProductForUsers",
			{
				refetchOnMount: false,
				refetchOnWindowFocus: false,
				keepPreviousData: true,
			},
			{
				params: {
					title: searchValue
				},
			}
		);


	const [hovered, setHovered] = useState(false);
	return (
		<form className="d-flex search-form">
			<input
				className="form-control form-control-lg ms-2 search-input"
				type="search"
				placeholder="بحث عن المنتجات"
				aria-label="Search"
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
				}}

			/>
			<button
				className="btn btn-outline-dark p-3"
				type="submit"
				onMouseEnter={() => {
					setHovered(true);
				}}
				onMouseLeave={() => {
					setHovered(false);
				}}
				onClick={(e) => {
					e.preventDefault();
					navigate(`/products?sr=${searchValue}`)

				}
				}
			>
				<SearchIcon
					style={{
						fill: hovered ? "var(--white-color)" : "",
					}}
				/>
			</button>
		</form>
	);
};

export default Search;
