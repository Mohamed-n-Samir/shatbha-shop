import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import useMutationCustom from "../../hooks/useMutationCustom";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IconButton, MenuItem, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import UpdateOrderStatus from "../UpdateOrderStatus/UpdateOrderStatus";
import "./orders-table.css"

const OrdersTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [rowValue, setRowValue] = useState({});
	const queryClient = useQueryClient();
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["orders-table-data"],
		"/getallorders",
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
				queryClient.invalidateQueries("orders-table-data");
			}
		},
	});

	const navigate = useNavigate();

	const handleSaveCell = (cell, value) => {
		switch (cell.column.id) {
			case "destinationAddress":
				if (value === "") {
					return toast.error("يجب ادخال عنوان التوصيل", {
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
						`updateOrder/${cell.row.original._id}`,
						{ destinationAddress: value },
						"patch",
					]);
				}

				break;
			case "notes":
				mutate([
					`updateOrder/${cell.row.original._id}`,
					{ notes: value },
					"patch",
				]);

			default:
				break;
		}
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
				accessorFn: (row) => `${row?._id}`,
				header: "المنتجات",
				id: "products",
				size: 120,
				enableEditing: false,
				Cell: ({ renderedCellValue }) => {
					return (
						<Link to={`/dashboard/product/${renderedCellValue}`}>
							المنتجات
						</Link>
					);
				},
			},
			{
				accessorFn: (row) => `${row?.paymentIntent?.id}`,
				id: "paymentIntentID",
				header: "رمز الدفع",
				size: 120,
				enableEditing: false,
			},
			// {
			// 	accessorFn: (row) => `${row?.paymentIntent?.method}`,
			// 	id: "paymentIntentMethod",
			// 	header: "طريقه الدفع",
			// 	size: 120,
			// 	enableEditing: false,
			// },
			{
				accessorFn: (row) => `${row?.paymentIntent?.amount}`,
				id: "paymentIntentAmount",
				header: "التكلفه",
				size: 100,
				enableEditing: false,
			},
			{
				accessorKey: "orderStatus",
				header: "حاله الطلب",
				size: 150,
				enableEditing: false,
			},
			{
				accessorFn: (row) =>
					`${row?.orderby?.firstname} ${row?.orderby?.lastname}`,
				id: "orderdby",
				header: "العميل",
				size: 200,
				enableEditing: false,
				Cell: ({ renderedCellValue, cell }) => {
					return (
						<div>
							<h2>{renderedCellValue}</h2>
							<Link
								to={`/dashboard/users`}
								state={{
									id: cell.row.original.orderby._id,
								}}
							>
								زياره المستخدم
							</Link>
						</div>
					);
				},
			},
			{
				accessorFn: (row) => `${row?.orderby?.mobile}`,
				id: "orderdbyMobile",
				header: "العميل رقم",
				size: 200,
				enableEditing: false,
				Cell: ({ renderedCellValue, cell }) => {
					return <h2>{renderedCellValue}</h2>;
				},
			},
			{
				accessorKey: "destinationAddress",
				header: "عنوان التوصيل",
				size: 200,
				enableEditing: true,
			},
			{
				accessorKey: "notes",
				header: "ملاحظات",
				size: 200,
				enableEditing: true,
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
				accessorKey: "actions",
				header: "Actions",
				enableEditing: false,
				size: 150,
				Cell: ({ cell }) => {
					return (
						<>
							<Button
								variant="dark fs-5 ms-2 p-2"
								onClick={() => {
									setUpdateModalOpen(true);
									setRowValue(cell.row.original);
								}}
							>
								تحديث
							</Button>
							<Button
								variant="primary fs-5 ms-2 py-2 px-3"
								onClick={() => {}}
							>
								طباعه الفاتوره
							</Button>
						</>
					);
				},
			},
		];
	}, []);

	return (
		<div className="users-table p-4 fs-3">
			<MaterialReactTable
				muiTableBodyRowProps={({ row }) => ({
					sx: {
						cursor: "pointer",
					},
				})}
				enableColumnResizing
				enableEditing
				editingMode="cell"
				muiTableBodyCellEditTextFieldProps={({ cell }) => ({
					onKeyDown: (event) => {
						if (event.key === "Enter") {
							handleSaveCell(cell, event.target.value);
						}
					},
					// onBlur: (event) => {
					// 	event.preventDefault();
					// 	if ((event.target.name = "orderStatus")) {
					//         console.log(event.target.value)
					//         mutate([
					//             `updateOrder/${cell.row.original._id}`,
					//             { orderStatus: event.target.value },
					//             "patch",
					//         ]);
					// 	} else {
					// 		onkeydown = (e) => {
					// 			if (e.key === "Enter") {
					// 				handleSaveCell(cell, event.target.value);
					// 			}
					// 		};
					// 	}
					// },
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
				data={data?.data?.alluserorders ?? []} //data is undefined on first render
				initialState={{
					showColumnFilters: true,
					columnVisibility: {
						isBlocked: false,
						createdAt: false,
						updatedAt: false,
						_id: false,
						paymentIntentID: false,
						paymentIntentMethod: false,
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
			<UpdateOrderStatus
				open={updateModalOpen}
				onClose={() => setUpdateModalOpen(false)}
				row={rowValue}
			/>
		</div>
	);
};

const ShowOrdersTable = () => <OrdersTable />;

export default ShowOrdersTable;
