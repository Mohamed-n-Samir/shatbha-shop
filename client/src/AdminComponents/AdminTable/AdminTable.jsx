import { useMemo, useState, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import "./admin-table.css";
import { Block, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateNewAdminModal from "../CreateNewAdminModal/CreateNewAdminModal";
import {
	Box,
	Button,
	IconButton,
	MenuItem,
	Tooltip,
} from "@mui/material";

const AdminTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["admins-table-data"],
		"/allAdmins",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);

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
			tableData.splice(row.index, 1);
			setTableData([...tableData]);
		},
		[tableData]
	);


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
					return row?.city?.name;
				},
				id: "city",
				header: "المدينة",
				size: 130,
			},
			{
				accessorKey: "gender",
				header: "الجنس",
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
			},
			{
				accessorFn: (row) => (row.isBlocked ? "true" : "false"),
				id: "isBlocked",
				header: "محظور",
				type: "boolean",
				size: 130,
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
				data={data?.data?.allAdmins ?? []} //data is undefined on first render
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
						<Tooltip arrow title="اضف مسؤل جديد">
							<Button
								color="secondary"
								onClick={() => setCreateModalOpen(true)}
								variant="contained"
								sx={{
									fontSize: "1.3rem",
								}}
							>
								اضف مسؤل جديد
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
				onEditingRowSave={handleSaveRowEdits}
				onEditingRowCancel={handleCancelRowEdits}
				renderRowActions={({ row, table }) => (
					<Box sx={{ display: "flex", gap: "1rem" }}>
						<Tooltip arrow placement="left" title="Edit">
							<IconButton
								onClick={() => table.setEditingRow(row)}
							>
								<Edit />
							</IconButton>
						</Tooltip>
						<Tooltip arrow placement="right" title="Delete">
							<IconButton
								color="error"
								onClick={() => handleDeleteRow(row)}
							>
								<Block />
							</IconButton>
						</Tooltip>
					</Box>
				)}
			/>
			<CreateNewAdminModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
			/>
		</div>
	);
};

const ShowAdminTable = () => <AdminTable />;

export default ShowAdminTable;
