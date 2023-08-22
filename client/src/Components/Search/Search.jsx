import { useState, useRef, useEffect } from "react";
import useQueryCustom from "../../hooks/useQueryCustom";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/searchIcon.svg";
import useDebounce from "../../hooks/useDebounce";
import HashLoader from "react-spinners/HashLoader";
import "./search.css";

const Search = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");
	const [blured, setBlured] = useState(true);
	const debouncedSearch = useDebounce(searchValue, 200);
	const menuRef = useRef(null);

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
					limit: 8,
					title: searchValue,
				},
			}
		);

	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		const handler = (e) => {
			if (
				menuRef.current !== null &&
				!menuRef.current.contains(e.target)
			) {
				setBlured(true);
			}
		};

		document.addEventListener("click", handler);
		return () => document.removeEventListener("click", handler);
	}, []);

	return (
		<>
			<form
				ref={menuRef}
				className="d-flex search-form position-relative"
			>
				<input
					className="form-control form-control-lg ms-2 search-input"
					type="search"
					placeholder="بحث عن المنتجات"
					aria-label="Search"
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					onFocus={() => {
						setBlured(false);
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
						if (searchValue.length > 0)
							navigate(`/products?sr=${searchValue}`);
					}}
					disabled={searchValue.length === 0}
				>
					<SearchIcon
						style={{
							fill: hovered ? "var(--white-color)" : "",
						}}
					/>
				</button>
				{isError && (
					<div className="search-result">
						Something went wrong ...
					</div>
				)}
				{(isLoading || isFetching) && !blured ? (
					<div className="search-result d-flex justify-content-center align-items-center p-4">
						<HashLoader size={30} />
					</div>
				) : (
					<>
						{data?.data?.products?.products?.length > 0 &&
						!blured ? (
							<div className="search-result">
								{data?.data?.products?.products?.map((item) => (
									<div
										className="search-result-item d-flex align-items-center justify-content-between gap-3"
										key={item._id}
										onClick={() => {
											navigate(`/product/${item.slug}`);
										}}
									>
										<img
											src={item.images[0].url}
											alt={item.title}
											className="search-result-item-img"
										/>
										<div className="search-result-item-title text-start fs-4">
											{item.title}
											<div className="search-result-item-price d-flex justify-content-end gap-3 fs-5 text-start">
												{item.newPrice !==
												item.oldPrice ? (
													<>
														<span className="old-price">{`EGP${item.oldPrice.toLocaleString(
															"en-US"
														)}.00`}</span>
														{`EGP${item.newPrice.toLocaleString(
															"en-US"
														)}.00`}
													</>
												) : (
													`EGP${item.oldPrice.toLocaleString(
														"en-US"
													)}.00`
												)}
											</div>
										</div>
									</div>
								))}
								<div className="see-all-res w-100">
									<button
										className="btn btn-outline-dark p-4 w-100 fs-4"
										onClick={(e) => {
											console.log(searchValue);
											e.preventDefault();
											navigate(
												`/products?sr=${searchValue}`
											);
										}}
									>
										عرض المزيد... (
										{data?.data?.products?.productCount})
									</button>
								</div>
							</div>
						) : !blured && searchValue !== "" ? (
							<div className="search-result">
								لا يوجد نتائج للبحث
							</div>
						) : null}
					</>
				)}
			</form>
		</>
	);
};

export default Search;
