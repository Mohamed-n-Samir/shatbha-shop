import { useMemo, useState, useCallback, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import useMutationCustom from "../../hooks/useMutationCustom";
import { useQueryClient } from "@tanstack/react-query";
import "./users-table.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IconButton, MenuItem, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal";

const UsersTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const location = useLocation();
	const [tableData, setTableData] = useState([]);
	const [id, setId] = useState(location.state?.id ?? null);
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [rowValue, setRowValue] = useState({});
	const queryClient = useQueryClient();
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["users-table-data"],
		"/allUsers",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	const { data: cityData, isLoading: isLoadingCity } = useQueryCustom(
		["city-data"],
		"/getAllCities",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

	const { mutate, isLoading: mutationLoading } = useMutationCustom({
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
				queryClient.invalidateQueries("users-table-data");
			}
		},
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (location.state?.id && data?.data?.allUsers) {
			console.log(location.state?.id);
			const filteredData = data?.data?.allUsers?.filter((row) => {
				return row._id === location?.state?.id;
			});
			console.log(filteredData);
			setTableData(filteredData);
		} else if (data?.data?.allUsers) {
			console.log("form else if");
			setTableData(data?.data?.allUsers);
		}
	}, [id, data?.data?.allUsers]);

	const handleSaveCell = async (cell, value) => {
		switch (cell.column.id) {
			case "fullname":
				if (!value) {
					toast.error("الرجاء ادخال الاسم الكامل", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					return;
				} else if (
					!(
						value.split(" ").length === 2 &&
						value.split(" ")[0].length > 2 &&
						value.split(" ")[1].length > 2
					)
				) {
					toast.error(
						"يجب ان يتكون من اسمين و يكون كل اسم يزيد عن حرفين",
						{
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							firstname: value.split(" ")[0],
							lastname: value.split(" ")[1],
						},
						"patch",
					]);
				}
				break;
			case "email":
				if (!value) {
					toast.error("الرجاء ادخال البريد الالكتروني", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					return;
				} else if (
					!value.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					)
				) {
					toast.error("الرجاء ادخال البريد الالكتروني بشكل صحيح", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							email: value.toLowerCase(),
						},
						"patch",
					]);
				}
				break;
			case "mobile":
				if (!value) {
					toast.error("الرجاء ادخال رقم الجوال", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					return;
				} else if (!value.match(/^01[0125][0-9]{8}$/gm)) {
					toast.error("الرجاء ادخال رقم الجوال بشكل صحيح", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							mobile: value,
						},
						"patch",
					]);
				}
				break;
			case "city":
				console.log(value);
				if (!value) {
					toast.error("الرجاء ادخال المدينة", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							city: value,
						},
						"patch",
					]);
				}
				break;
			case "area":
				if (!value) {
					toast.error("الرجاء ادخال المنطقه", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});

					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							area: value,
						},
						"patch",
					]);
				}
				break;
			case "buildingAndApartment":
				if (!value) {
					toast.error("الرجاء ادخال رقم العمارة و الشقة", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});

					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							buildingAndApartment: value,
						},
						"patch",
					]);
				}
				break;
			case "gender":
				if (!value) {
					toast.error("الرجاء ادخال الجنس", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});

					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							gender: value,
						},
						"patch",
					]);
				}
				break;
			case "isBlocked":
				if (!value) {
					toast.error("الرجاء ادخال حالة الحظر", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});

					return;
				} else {
					mutate([
						`updateUser-admin/${cell.row.original._id}`,
						{
							isBlocked: value,
						},
						"patch",
					]);
				}
				break;

			default:
				break;
		}

		console.log(value);
	};

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
				accessorFn: (row) => `${row.firstname} ${row.lastname}`.trim(),
				header: "الاسم الكامل",
				id: "fullname",
				size: 130,
			},
			{
				accessorKey: "role",
				header: "الدور",
				size: 100,
				enableEditing: false,
			},
			{
				accessorKey: "email",
				header: "البريد الالكتروني",
				type: "email",
				size: 200,
			},
			{
				accessorKey: "mobile",
				header: "الهاتف",
				size: 130,
			},
			{
				accessorFn: (row) => {
					if (cityData?.data?.allCities) {
						return row?.city?.name?.trim();
					}
				},
				id: "city",
				header: "المدينة",
				size: 130,
				enableEditing: false,
			},
			{
				accessorKey: "gender",
				header: "الجنس",
				enableEditing: false,
				size: 130,
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
				accessorKey: "updatedAt",
				header: "Updated At",
				type: "date",
				enableEditing: false,
			},
			{
				accessorKey: "area",
				header: "المنطقة",
				enableEditing: true,
				size: 130,
			},
			{
				accessorKey: "buildingAndApartment",
				header: "المبنى والشقة",
				enableEditing: true,
				size: 140,
			},
			{
				accessorKey: "wishlist",
				header: "المفضلة",
				enableEditing: false,
				size: 130,
				Cell: ({ cell }) => {
					return (
						<Button
							variant="contained"
							className="btn btn-dark fs-5"
							onClick={() => {
								navigate(
									`/dashboard/wishlist/${cell.getValue()}`
								);
							}}
						>
							شاهد المفضله
						</Button>
					);
				},
			},
			{
				accessorKey: "actions",
				header: "Actions",
				enableEditing: false,
				size: 150,
				Cell: ({ cell }) => {
					return (
						<>
							<Button
								variant="dark fs-5 ms-2 py-2 px-3"
								onClick={() => {
									setUpdateModalOpen(true);
									setRowValue(cell.row.original);
								}}
							>
								تحديث
							</Button>
							{cell.row.original.isBlocked === false ? (
								<Button
									variant="danger fs-5 py-2 px-3"
									onClick={() => {
										mutate([
											`block-user/${cell.row.original._id}`,
											null,
											"put",
										]);
									}}
								>
									حظر
								</Button>
							) : (
								<Button
									variant="primary fs-5 py-2 px-3"
									onClick={() => {
										mutate([
											`unblock-user/${cell.row.original._id}`,
											null,
											"put",
										]);
									}}
								>
									الغاء الحظر
								</Button>
							)}
						</>
					);
				},
			},
			{
				accessorFn: (row) => (row.isBlocked ? "true" : "false"),
				id: "isBlocked",
				header: "محظور",
				enableEditing: false,
				type: "boolean",
				size: 130,
			},
		];
	}, [cityData?.data]);

	return (
		<div className="users-table p-4 fs-3">
			<MaterialReactTable
				enableColumnResizing
				enableEditing
				editingMode="cell"
				muiTableBodyCellEditTextFieldProps={({ cell }) => ({
					onKeyDown: (event) => {
						if (event.key === "Enter") {
							handleSaveCell(cell, event.target.value);
						}
					},
				})}
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
				data={tableData ?? []} //data is undefined on first render
				initialState={{
					showColumnFilters: true,
					columnVisibility: {
						isBlocked: false,
						createdAt: false,
						updatedAt: false,
						role: false,
						wishlist: false,
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
					</div>
				)}
				state={{
					columnFilters,
					globalFilter,
					isLoading: isLoading && isLoadingCity,
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
			<UpdateUserModal
				open={updateModalOpen}
				onClose={() => setUpdateModalOpen(false)}
				row={rowValue}
			/>
		</div>
	);
};

const ShowUsersTable = () => <UsersTable />;

export default ShowUsersTable;
