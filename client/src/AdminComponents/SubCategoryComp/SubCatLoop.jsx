import { Button, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import useQueryCustom from "../../hooks/useQueryCustom";
import useMutationCustom from "../../hooks/useMutationCustom";
import HashLoader from "react-spinners/HashLoader";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

const SubCatLoop = ({ categoryID }) => {
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["subCat-table-data"],
		"getCreateSubCategory/" + categoryID,
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	console.log(data?.data?.subCategory?._id);

	const { mutate, isLoading: mutateLoading } = useMutationCustom({
		onSuccess: (data) => {
			console.log(data);
			if (data) {
				console.log(data);
				toast.success(data.data.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			}
		},
	});

	const [subCat, setSubCat] = useState([]);

	useEffect(() => {
		if (data?.data?.subCategory?.subCategory) {
			setSubCat(data?.data?.subCategory?.subCategory);
		}
	}, [data]);

	useEffect(() => {
		refetch();
	}, [categoryID, refetch]);

	const handleChange = (e) => {
		console.log(e.target.value);
	};

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
			<>
				<Form className="rounded p-4 p-sm-3 register-form w-100 ">
					{subCat?.map((item, index) => (
						<Form.Group
							key={index}
							controlId="subCategory"
							className="position-relative"
						>
							<Form.Label>{`القسم الفرعي ${
								index + 1
							}`}</Form.Label>
							<Form.Control
								type="text"
								placeholder={`القسم الفرعي ${index + 1}`}
								name="subCategory"
								onChange={(e) => {
									setSubCat(
										subCat.map((item, i) =>
											i === index ? e.target.value : item
										)
									);
									console.log(subCat);
								}}
								className="py-3 fs-5"
								value={item}
							></Form.Control>
							{index === subCat.length - 1 && (
								<Delete
									style={{
										cursor: "pointer",
										position: "absolute",
										top: "80%",
										left: "10px",
										transform: "translateY(-80%)",
										color: "var(--danger-color)",
									}}
									onClick={() => {
										setSubCat(
											subCat.filter((_, i) => i !== index)
										);
									}}
								/>
							)}
						</Form.Group>
					))}
				</Form>
				<div className="add-sub-cat w-100 p-3 d-flex justify-content-between align-items-center">
					<Button
						onClick={() => {
							setSubCat([...subCat, ""]);
						}}
						className="p-3 fs-5 btn-dark"
					>
						اضافة قسم فرعي
					</Button>
					<Button
						onClick={() => {
							if (subCat.length === 0) {
								return toast.error("لا يوجد اقسام فرعية", {
									position: "top-center",
									autoClose: 5000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: "dark",
								});
							}

							const arrCheck = subCat.map((item) => item.trim());
							const arrCheck1 = subCat.filter(
								(item) => !(item.length > 0 && item.length < 32)
							);
							if (arrCheck.includes("")) {
								return toast.error(
									"لا يمكن ان يكون هناك قسم فرعي فارغ",
									{
										position: "top-center",
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "dark",
									}
								);
							} else if (
								arrCheck.length !== new Set(arrCheck).size
							) {
								return toast.error(
									"لا يمكن ان يكون هناك قسم فرعي مكرر",
									{
										position: "top-center",
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "dark",
									}
								);
							} else if (arrCheck1.length > 0) {
								console.log(arrCheck1);
								return toast.error(
									"لا يمكن ان يكون القسم الفرعي اكثر من 32 حرف",
									{
										position: "top-center",
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "dark",
									}
								);
							} else {
								mutate([
									`updateSubCategory/${data?.data?.subCategory?._id}`,
									{ subCategory: arrCheck },
									"patch",
								]);
							}
						}}
						className="p-3 fs-5 btn-success"
					>
						حفظ التغييرات
					</Button>
				</div>
			</>
		);
	}
};

export default SubCatLoop;

// getCreateCategory
