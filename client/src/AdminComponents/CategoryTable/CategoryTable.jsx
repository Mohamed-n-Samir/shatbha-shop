import { useMemo, useState, useCallback, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import "./category-table.css";
import CreateNewCategoryModal from "../CreateNewCategoryModal/CreateNewCategoryModal";
import { Button } from "react-bootstrap";
import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useMutationCustom from "../../hooks/useMutationCustom";
import { useLocation } from "react-router-dom";

const CategoryTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const location = useLocation();
	const [tableData, setTableData] = useState([]);
	const [id, setId] = useState(location.state?.id ?? null);
	const queryClient = useQueryClient();

	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["category-table-data"],
		"/allCategory",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (location.state?.id && data?.data) {
			console.log(location.state?.id);
			const filteredData = data?.data?.filter((row) => {
				return row._id === location?.state?.id;
			});
			console.log(filteredData);
			setTableData(filteredData);
		} else if (data?.data) {
			console.log("form else if");
			setTableData(data?.data);
		}
	}, [id, data?.data]);

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
				queryClient.invalidateQueries("category-table-data");
			}
		},
	});

	const handleSaveCell = (cell, value) => {
		if (value.trim() === "") {
			return toast.error("اسم القسم لا يمكن ان يكون فارغا", {
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

		mutate([
			`updateCategory/${cell.row.original._id}`,
			{ title: value.trim() },
			"patch",
		]);
	};

	const handleDeleteRow = useCallback((row) => {
		if (
			!confirm(`Are you sure you want to delete ${row.getValue("title")}`)
		) {
			return;
		}
		//send api delete request here, then refetch or update local table data for re-render
		mutate([
			"deleteCategory",
			{ data: { id: row.getValue("_id") } },
			"delete",
		]);
	}, []);

	const columns = useMemo(() => {
		return [
			{
				accessorKey: "_id",
				header: "ID",
				enableColumnOrdering: false,
				enableEditing: false, //disable editing on this column
				enableSorting: false,
				size: 80,
			},
			{
				accessorKey: "title",
				header: "اسم القسم",
				size: 80,
				enableEditing: true,
			},
			{
				accessorKey: "delete",
				header: "Action",
				size: 80,
				Cell: ({ cell }) => {
					return (
						<Button
							variant="danger fs-5 m-auto px-3 py-2"
							onClick={() => {
								handleDeleteRow(cell.row);
							}}
						>
							حذف
						</Button>
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
				header: "Updated At",
				enableEditing: false,
			},
		];
	}, []);

	// console.log(data.data)

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
				data={tableData} //data is undefined on first render
				initialState={{
					showColumnFilters: true,
					columnVisibility: {
						createdAt: false,
						updatedAt: false,
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
						<Tooltip arrow title="اضف ماركه جديد">
							<Button
								className="btn btn-dark fs-5 px-4 py-3"
								onClick={() => setCreateModalOpen(true)}
							>
								اضف قسم جديد
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
				enableEditing={true}
				editingMode="cell"
				muiTableBodyCellEditTextFieldProps={({ cell }) => ({
					onKeyDown: (event) => {
						if (event.key === "Enter") {
							handleSaveCell(cell, event.target.value);
						}
					},
				})}
				enableColumnOrdering
			/>
			<CreateNewCategoryModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
			/>
		</div>
	);
};

const ShowCategoryTable = () => <CategoryTable />;

export default ShowCategoryTable;
