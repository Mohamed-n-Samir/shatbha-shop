import useQueryCustom from "../../hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";

const Categories = () => {
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["sub-categories-data"],
		"/getAllSubCategoryData",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	if (isLoading || isFetching) {
		return (
			<div className="loading-section is-loading ">
				<HashLoader size={40} />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="is-loading">
				<h2 className="text-center">
					حدث خطأ اثناء التحميل اعد تحميل الصفحه!!!
				</h2>
			</div>
		);
	}

    console.log(data?.data?.allSubCategory)

	if (data?.data?.allSubCategory?.length === 0) {
		return (
			<div className="is-loading">
				<h2 className="text-center">!!! لا يوجد أقسام</h2>
			</div>
		);
	}

	if (data?.data?.allSubCategory?.length > 0) {
        console.log(data?.data?.allSubCategory)
		return (
			<ul className="main-ul">
				{data?.data?.allSubCategory?.map((category) => (
					<li key={category._id} className="">
						<Link to={`/product-category/${category.category.title}`}>
							{category?.category?.title}
						</Link>
                        <ul className="inner-ul">
                            {category?.subCategory?.map((subCategory) => (
                                <li key={subCategory}>
                                    <Link to={`/product-category/${category.category.title}/${subCategory}`}>
                                        {subCategory}
                                    </Link>
                                </li>
                            ))}
                        </ul>

					</li>
				))}
			</ul>
		);
	}
};

export default Categories;