import { useMemo, useState, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import "./brands-table.css";
import { Block, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateNewBrandModal from "../CreateNewBrandModal/CreateNewBrandModal";
import { Button } from "react-bootstrap";
import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useMutationCustom from "../../hooks/useMutationCustom";

const BrandsTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const queryClient = useQueryClient();

	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["brands-table-data"],
		"/allBrands",
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
				queryClient.invalidateQueries("brands-table-data");
			}
		},
	});

	const handleSaveCell = (cell, value) => {
		switch (cell.column.id) {
			case "name":
				if (value === "") {
					return toast.error("يجب ادخال اسم الماركه", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
				} else {
					mutate([
						`updateBrand/${cell.row.original._id}`,
						{ name: value },
						"patch",
					]);
				}
				break;

			case "description":
				if (value === "") {
					return toast.error("يجب ادخال الوصف", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
				} else {
					mutate([
						`updateBrand/${cell.row.original._id}`,
						{ description: value },
						"patch",
					]);
				}
				break;
			case "url":
				mutate([
					`updateBrand/${cell.row.original._id}`,
					{ url: value },
					"patch",
				]);

				break;
			default:
				break;
		}
	};

	const handleDeleteRow = useCallback((row) => {
		if (
			!confirm(`Are you sure you want to Suspend ${row.getValue("name")}`)
		) {
			return;
		}
		//send api delete request here, then refetch or update local table data for re-render
		mutate([
			"deleteBrand",
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
				size: 150,
			},
			{
				accessorKey: "name",
				header: "اسم الماركه",
				size: 130,
				enableEditing: true,
			},
			{
				accessorKey: "description",
				header: "الوصف",
				size: 130,
				enableEditing: true,
			},
			{
				accessorKey: "url",
				header: "الموقع الالكتروني",
				size: 130,
				enableEditing: true,
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
				data={data?.data?.allBrand ?? []} //data is undefined on first render
				initialState={{
					showColumnFilters: true,
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
								اضف ماركه جديد
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
					onBlur: (event) => {
						console.log(cell, event.target.value)
						handleSaveCell(cell, event.target.value);
					},
				})}
				enableColumnOrdering
			/>
			<CreateNewBrandModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
			/>
		</div>
	);
};

const ShowAdminTable = () => <BrandsTable />;

export default ShowAdminTable;
