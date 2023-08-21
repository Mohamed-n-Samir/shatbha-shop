import { useMemo, useState, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import "./product-table.css";
import { Block, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateNewProductModal from "../CreateNewProductModal/CreateNewProductModal";
import { toast } from "react-toastify";
import useMutationCustom from "../../hooks/useMutationCustom";
import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ProductTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const queryClient = useQueryClient();
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["products-table-data"],
		"/allProduct",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	
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
				queryClient.invalidateQueries("products-table-data");
			}
		},
	});

	const [tableData, setTableData] = useState(() => data);

	// const handleCreateNewRow = (values) => {
	// 	tableData.push(values);
	// 	setTableData([...tableData]);
	// };

	const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
		if (!Object.keys(validationErrors).length) {
			tableData[row.index] = values;
			//send/receive api updates here, then refetch or update local table data for re-render
			setTableData([...tableData]);
			exitEditingMode(); //required to exit editing mode and close modal
		}
	};

	const handleCancelRowEdits = () => {
		setValidationErrors({});
	};

	const handleDeleteRow = useCallback(
		(row) => {
			if (
				!confirm(
					`Are you sure you want to Suspend ${row.getValue("_id")}`
				)
			) {
				return;
			}
			//send api delete request here, then refetch or update local table data for re-render
			mutate([
				"deleteProduct",
				{ data: { id: row.getValue("_id") } },
				"delete",
			]);
		},
		[tableData]
	);

	const handleSaveCell = async (cell, value) => {
		switch (cell.column.id) {
			case "title":
				if (!value) {
				return toast.error("العنوان مطلوب", {
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
				break;
			case "description":
				if (!value) {
				return toast.error("الوصف مطلوب", {
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
				break;
			// case "category":
			// 	if (!value) {
			// 	return toast.error("", {
			// 		position: "top-center",
			// 		autoClose: 5000,
			// 		hideProgressBar: false,
			// 		closeOnClick: true,
			// 		pauseOnHover: true,
			// 		draggable: true,
			// 		progress: undefined,
			// 		theme: "dark",
			// 	});
			// 	}

			// 	break;
			case "oldPrice":
				if (!value) {
				return toast.error("السعر القديم مطلوب", {
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
				break;
			case "newPrice":
				if (!value) {
				return toast.error("السعر الجديد مطلوب", {
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
				else if (value.match(/^[0-9]+$/) == null) {
					return toast.error("السعر الجديد يجب ان يكون ارقام فقط", {
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
				else if (value <= 0) {
					return toast.error("السعر الجديد يجب ان يكون اكبر من الصفر", {
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
				else {
					mutate([
						`updateProduct/${cell.row.original._id}`,
						{
							newPrice: value,
						},
						"patch",
					]);
				}
				break;
			case "quantity":
				if (!value) {
				return toast.error("الكميه مطلوبه", {
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
				break;
			default:
				toast.error("حدث خطأ ما", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});

				break;
		}}	


	const columns = useMemo(() => {
		return [
			{
				accessorKey: "_id",
				header: "ID",
				enableColumnOrdering: false,
				enableEditing: false, //disable editing on this column
				enableSorting: false,
				size: 150,
			},
			{
				accessorKey: "title",
				header: "العنوان",
				size: 130,
			},
			{
				accessorKey: "description",
				header: "الوصف",
				enableEditing: false,
				size: 400,
			},
			{
				accessorKey: "category",
				header: "القسم",
				size: 130,
				Cell: ({ row }) => {
					return (
						<Link
							to={"/dashboard/category"}
							className="d-flex justify-content-center"
						>
							{row?.original?.category?.title}
						</Link>
					);
				},
			},
			{
				accessorKey: "brand",
				header: "الماركة",
				size: 130,
				Cell: ({ row }) => {
					return (
						<Link className="d-flex justify-content-center">
							{row?.original?.brand?.name}
						</Link>
					);
				},
			},
			{
				accessorKey: "oldPrice",
				header: "السعر القديم",
				size: 140,
			},
			{
				accessorFn: (row) => {
					console.log(row);
					return row?.newPrice === null
						? row?.oldPrice
						: row?.newPrice;
				},
				id: "newPrice",
				header: "السعر الجديد",
				size: 140,
			},
			{
				accessorKey: "images",
				header: "الصور",
				Cell: ({ row }) => {
					return (
						<div className="d-flex justify-content-between flex-wrap gap-3">
							{row?.original?.images?.map((image) => (
								<img
									key={image.id}
									src={image.url}
									alt="product"
									className="product-image"
								/>
							))}
						</div>
					);
				},
				size: 250,
			},
			{
				accessorKey: "tags",
				header: "التاجات",
				size: 130,
				Cell: ({ row }) => {
					return (
						<div className="d-flex flex-column gap-2">
							{row?.original?.tags?.map((tag) => (
								<span
									key={tag}
									className="tag p-3 bg-dark text-white d-flex justify-content-center align-items-center"
								>
									{tag}
								</span>
							))}
						</div>
					);
				},
			},
			{
				accessorFn: (row) => {
					const formatedDate = new Date(row.createdAt);
					return formatedDate.toLocaleDateString("en-US", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						hour12: false,
					});
				},
				id: "createdAt",
				header: "Created At",
				enableEditing: false,
			},
			{
				accessorFn: (row) => {
					const formatedDate = new Date(row.updatedAt);
					return formatedDate.toLocaleDateString("en-US", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						hour12: false,
					});
				},
				id: "updatedAt",
				header: "updated At",
				enableEditing: false,
			},
			{
				accessorKey: "delete",
				header: "Action",
				size: 130,
				Cell: ({ cell }) => {
					return (
						<Button
							className="btn btn-dark fs-5 m-auto px-3 py-2"
							onClick={() => {
								handleDeleteRow(cell.row);
							}}
						>
							حذف
						</Button>
					);
				},
			},
		];
	}, []);

	return (
		<div className="users-table p-4 fs-3">
			<MaterialReactTable
				enableColumnResizing
				displayColumnDefOptions={{
					"mrt-row-actions": {
						muiTableHeadCellProps: {
							align: "center",
						},
						size: 100,
					},
				}}
				muiTableHeadCellProps={{
					sx: {
						fontSize: "1.5rem",
						"& span": {
							display: "flex",
							justifyContent: "center",
						},
					},
				}}
				muiTableBodyCellProps={{
					sx: {
						textAlign: "right",
						fontSize: "1.1rem",
					},
				}}
				columns={columns}
				data={data?.data ?? []} //data is undefined on first render
				initialState={{
					showColumnFilters: true,
					columnVisibility: {
						description: false,
						createdAt: false,
						updatedAt: false,
						tags: false,
						_id: false,
					},
				}}
				muiToolbarAlertBannerProps={
					isError
						? {
								color: "error",
								children: "Error loading data",
						  }
						: undefined
				}
				enableEditing
				editingMode="cell"
				muiTableBodyCellEditTextFieldProps={({ cell }) => ({
					onBlur: (event) => {
						console.log(event.target);
						handleSaveCell(cell, event.target.value);
					},
				})}
				onColumnFiltersChange={setColumnFilters}
				onGlobalFilterChange={setGlobalFilter}
				onSortingChange={setSorting}
				renderTopToolbarCustomActions={() => (
					<div>
						<Tooltip arrow title="اعاده احضار البيانات">
							<IconButton onClick={() => refetch()}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
						<Tooltip arrow title="اضف مسؤل جديد">
							<Button
								className="btn btn-dark fs-5 m-auto px-3 py-3"
								onClick={() => {
									setCreateModalOpen(true);
								}}
							>
								اضف منتج جديد
							</Button>
						</Tooltip>
					</div>
				)}
				state={{
					columnFilters,
					globalFilter,
					isLoading: isLoading,
					showAlertBanner: isError,
					showProgressBars: isFetching,
					sorting,
				}}
				enablePagination={true}
				muiTablePaginationProps={{
					rowsPerPageOptions: [5, 10, 15],
					showFirstButton: true,
					showLastButton: true,
				}}
				enableColumnOrdering
			/>
			<CreateNewProductModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
			/>
		</div>
	);
};

const ShowAdminTable = () => <ProductTable />;

export default ShowAdminTable;
