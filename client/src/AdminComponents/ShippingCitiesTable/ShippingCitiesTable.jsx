import { useMemo, useState, useCallback, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import CreateNewCityModal from "../CreateNewCityModal/CreateNewCityModal";
import { Button } from "react-bootstrap";
import { IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useMutationCustom from "../../hooks/useMutationCustom";

const ShippingCitiesTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const queryClient = useQueryClient();

	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["shippingcities-table-data"],
		"/getAllCities",
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
					if (value.length < 3) {
						return toast.error(
							"يجب ان يكون اسم المدينه اكثر من ثلاثه حروف",
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
					}
					if (cell.row.original._id === "64d6c066ba4241ab93a23f48") {
						return toast.error("لا يمكن تعديل اسم هذه المدينه", {
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
						`updateCity/${cell.row.original._id}`,
						{ name: value },
						"patch",
					]);
				}
				break;

			case "shippingCharge":
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
					if (value < 0) {
						return toast.error("يجب ادخال رقم اكبر من الصفر", {
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
					if (cell.row.original._id === "64d6c066ba4241ab93a23f48") {
						return toast.error("لا يمكن تعديل رسوم هذه المدينه", {
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
						`updateCity/${cell.row.original._id}`,
						{ shippingCharge: value },
						"patch",
					]);
				}
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
		if (row.getValue("_id") === "64d6c066ba4241ab93a23f48") {
			return toast.error("لا يمكن حذف هذه المدينه", {
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
		mutate(["deleteCity", { data: { id: row.getValue("_id") } }, "delete"]);
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
				header: "اسم المدينه",
				size: 130,
				enableEditing: true,
			},
			{
				accessorKey: "shippingCharge",
				header: "رسوم الشحن",
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
							className="btn btn-danger fs-5 m-auto px-3 py-2"
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
				data={data?.data?.allCities ?? []} //data is undefined on first render
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
						<Tooltip arrow title="اضف مدينه جديدة">
							<Button
								className="btn btn-dark fs-5 px-4 py-3"
								onClick={() => setCreateModalOpen(true)}
							>
								اضف مدينه جديدة
							</Button>
						</Tooltip>
					</div>
				)}
				state={{
					columnFilters,
					globalFilter,
					isLoading: isLoading || mutateLoading,
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
			<CreateNewCityModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
			/>
		</div>
	);
};

const ShowShippingCitiesTable = () => <ShippingCitiesTable />;

export default ShowShippingCitiesTable;
