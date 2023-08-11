/* eslint-disable no-mixed-spaces-and-tabs */
import { useMemo, useState, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import useQueryCustom from "../../hooks/useQueryCustom";
import "./users-table.css";
import { Block, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
	Box,
	// Button,
	// Dialog,
	// DialogActions,
	// DialogContent,
	// DialogTitle,
	IconButton,
	MenuItem,
	// Stack,
	// TextField,
	Tooltip,
} from "@mui/material";

const UsersTable = () => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	// const [createModalOpen, setCreateModalOpen] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["users-table-data"],
		"/allUsers",
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

	const navigate = useNavigate();

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

	const getCommonEditTextFieldProps = useCallback(
		(cell) => {
			return {
				error: !!validationErrors[cell.id],
				helperText: validationErrors[cell.id],
				onBlur: (event) => {
					const isValid =
						cell.column.id === "email"
							? validateEmail(event.target.value)
							: cell.column.id === "age"
							? validateAge(+event.target.value)
							: validateRequired(event.target.value);
					if (!isValid) {
						//set validation error for cell if invalid
						setValidationErrors({
							...validationErrors,
							[cell.id]: `${cell.column.columnDef.header} is required`,
						});
					} else {
						//remove validation error for cell if valid
						delete validationErrors[cell.id];
						setValidationErrors({
							...validationErrors,
						});
					}
				},
			};
		},
		[validationErrors]
	);

	const columns = useMemo(
		() => [
			{
				accessorKey: "_id",
				header: "ID",
				enableColumnOrdering: false,
				enableEditing: false, //disable editing on this column
				enableSorting: false,
				size: 150,
			},
			{
				accessorKey: "fullName",
				header: "Full Name",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
			},
			{
				accessorKey: "username",
				header: "Username",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
				enableEditing: false,
			},
			{
				accessorKey: "email",
				header: "Email",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
				type: "email",
			},
			{
				accessorKey: "dadNumber",
				header: "Dad Number",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
			},
			{
				accessorKey: "callNumber",
				header: "Call Number",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
			},
			{
				accessorKey: "mumNumber",
				header: "Mum Number",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
			},
			{
				accessorKey: "city",
				header: "City",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
			},
			{
				accessorKey: "gender",
				header: "Gender",
				muiTableBodyCellEditTextFieldProps: {
					select: true, //change to select for a dropdown
					children: [
						<MenuItem key={0} value={"Male"}>
							Male
						</MenuItem>,
						<MenuItem key={1} value={"Female"}>
							Female
						</MenuItem>,
					],
				},
			},
			{
				accessorFn: (row) => {
					const formatedDate = new Date(row.lastseen);
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
				id: "lastseen",
				header: "Last Seen",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
				type: "date",
				enableEditing: false,
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
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
				enableEditing: false,
			},
			{
				accessorKey: "updatedAt",
				header: "Updated At",
				type: "date",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
				enableEditing: false,
			},
			{
				accessorKey: "cash",
				header: "Cash",
				enableEditing: false,
			},
			{
				accessorFn: (row) => (row.suspended ? "true" : "false"),
				id: "suspended",
				header: "Suspended",
				muiTableBodyCellEditTextFieldProps: {
					select: true, //change to select for a dropdown
					children: [
						<MenuItem key={0} value={"true"}>
							true
						</MenuItem>,
						<MenuItem key={1} value={"false"}>
							false
						</MenuItem>,
					],
				},
				type: "boolean",
			},
			{
				accessorKey: "facebookProfile",
				header: "Facebook",
				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					...getCommonEditTextFieldProps(cell),
				}),
			},
		],
		[getCommonEditTextFieldProps]
	);

	return (
		<div className="users-table ">
			<MaterialReactTable
				muiTableBodyRowProps={({ row }) => ({
					onDoubleClick: (event) => {
						console.info(event, row.getValue("_id"));
						navigate(`/users/${row.getValue("_id")}`, {
							state: { id: row.getValue("_id") },
						});
					},
					sx: {
						cursor: "pointer",
					},
				})}
				enableColumnResizing
				displayColumnDefOptions={{
					"mrt-row-actions": {
						muiTableHeadCellProps: {
							align: "center",
						},
						size: 120,
					},
				}}
				columns={columns}
				data={data?.data?.allUsers ?? []} //data is undefined on first render
				initialState={{
					showColumnFilters: true,
					columnVisibility: {
						facebookProfile: false,
						updatedAt: false,
						createdAt: false,
						gender: false,
						city: false,
						_id: false,
						username: false,
						lastseen: false,
						cash: false,
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
					<Tooltip arrow title="Refresh Data">
						<IconButton onClick={() => refetch()}>
							<RefreshIcon />
						</IconButton>
					</Tooltip>
				)}
				state={{
					columnFilters,
					globalFilter,
					isLoading,
					showAlertBanner: isError,
					showProgressBars: isFetching,
					sorting,
				}}
				enablePagination={true}
				muiTablePaginationProps={{
					rowsPerPageOptions: [5, 10],
					showFirstButton: true,
					showLastButton: true,
				}}
				editingMode="modal" //default
				enableColumnOrdering
				enableEditing
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
		</div>
	);
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
	!!email.length &&
	email
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
const validateAge = (age) => age >= 18 && age <= 50;

const ShowUsersTable = () => <UsersTable />;

export default ShowUsersTable;
