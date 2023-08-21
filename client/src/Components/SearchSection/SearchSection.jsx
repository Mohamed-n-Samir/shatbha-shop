import { useState } from "react";
import { useParams } from "react-router-dom";
import "./search-section.css";

const SearchSection = ({ gte, lte, sort }) => {
	const { searchString } = useParams();
    const [pageNumber, setPageNumber] = useState(1);
	const limit = 9;

	return (
		<section className="d-flex flex-column gap-4 search-section">

		</section>
	);
};

export default SearchSection;
