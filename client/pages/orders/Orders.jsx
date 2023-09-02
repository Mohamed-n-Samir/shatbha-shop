import { useMemo, useState, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
// import RefreshIcon from "@mui/icons-material/Refresh";
import { Row, Col } from "react-bootstrap";
import Layout from "../../src/Components/Layout/Layout";
import { useDataProvider } from "../../src/hooks/useDataProvider";
import { useNavigate } from "react-router-dom";
import useQueryCustom from "../../src/hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";
import "./orders.css";

const Orders = () => {
	// window.scrollTo(0, 0);
	const navigate = useNavigate();
	const { user } = useDataProvider();
	if (!user || user === "none") {
		navigate("/login");
	}
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const { data, isError, isFetching, isLoading, refetch } = useQueryCustom(
		["orders-data"],
		"/getOrders",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
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
				accessorFn: (row) => `${row.paymentIntent.method}`.trim(),
				header: "طريقه الدفع",
				id: "method",
				enableEditing: false,
				size: 130,
			},
			// {
			// 	accessorFn: (row) => `${row.paymentIntent.status}`.trim(),
			// 	header: "طريقه الدفع",
			// 	id: "status",
			// 	enableEditing: false,
			// 	size: 130,
			// },
			{
				accessorFn: (row) => `${row.paymentIntent.amount}`.trim(),
				header: "المبلغ الكامل",
				id: "amount",
				enableEditing: false,
				size: 130,
			},
			{
				accessorKey: "destinationAddress",
				header: "عنوان الوصول",
				size: 200,
				enableEditing: false,
			},
			{
				accessorKey: "orderStatus",
				header: "الحاله",
				size: 150,
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
				header: "تاريخ الطلب",
				enableEditing: false,
			},
		];
	}, []);

	if (isLoading || isFetching) {
		return (
			<Layout
				robots={false}
				canonicalUrl={`/orders`}
				ogUrl={`/orders`}
				ogTitle={"الطلبات - Shatbha Shop | شطبها شوب"}
				ogDescription={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				title={"الطلبات - Shatbha Shop | شطبها شوب"}
				description={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				msapplicationTileImage={"smallbitmap.svg"}
				className={"py-5"}
			>
				<h1
					style={{
						fontSize: "4rem",
					}}
					className="text-center fw-bolder"
				>
					الطلبات
				</h1>
				<div className="is-loading ">
					<HashLoader size={40} />
				</div>
			</Layout>
		);
	}

	if (isError) {
		return (
			<Layout
				robots={false}
				canonicalUrl={`/orders`}
				ogUrl={`/orders`}
				ogTitle={"الطلبات - Shatbha Shop | شطبها شوب"}
				ogDescription={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				title={"الطلبات - Shatbha Shop | شطبها شوب"}
				description={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				msapplicationTileImage={"smallbitmap.svg"}
				className={"py-5"}
			>
				<h1
					style={{
						fontSize: "4rem",
					}}
					className="text-center fw-bolder"
				>
					الطلبات
				</h1>
				<div className="is-loading ">
					<h2 className="text-center text-danger">
						حدث خطأ اثناء التحميل اعد تحميل الصفحه!!!
					</h2>
				</div>
			</Layout>
		);
	}

	console.log(data?.data?.userOrders?.length);

	if (data && data?.data?.userOrders?.length === 0) {
		return (
			<Layout
				robots={false}
				canonicalUrl={`/orders`}
				ogUrl={`/orders`}
				ogTitle={"الطلبات - Shatbha Shop | شطبها شوب"}
				ogDescription={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				title={"الطلبات - Shatbha Shop | شطبها شوب"}
				description={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				msapplicationTileImage={"smallbitmap.svg"}
				className={"py-5"}
			>
				<h1
					style={{
						fontSize: "4rem",
					}}
					className="text-center fw-bolder"
				>
					الطلبات
				</h1>
				<div className="is-loading container">
					<div
						style={{
							borderTop: "1px solid #000",
						}}
						className="w-100 py-4 bg-white px-3 fs-3 fw-bolder"
					>
						لا يوجد طلبات حاليا !!!
					</div>
				</div>
			</Layout>
		);
	}

	if (data && data?.data?.userOrders?.length > 0) {
		return (
			<Layout
				robots={false}
				canonicalUrl={`/orders`}
				ogUrl={`/orders`}
				ogTitle={"الطلبات - Shatbha Shop | شطبها شوب"}
				ogDescription={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				title={"الطلبات - Shatbha Shop | شطبها شوب"}
				description={
					"راجع طلباتك السابقة و اتبع حالة الطلب و تواصل معنا في حالة وجود مشكلة في الطلب - Shatbha Shop | شطبها شوب"
				}
				msapplicationTileImage={"smallbitmap.svg"}
				className={"py-5"}
			>
				<h1
					style={{
						fontSize: "4rem",
					}}
					className="text-center fw-bolder"
				>
					الطلبات
				</h1>
				<div className="container mt-5">
					<MaterialReactTable
						enableColumnResizing
						enableGrouping
						enableColumnFilterModes={false}
						enableColumnFilters={false}
						enableFilters={false}
						positionToolbarAlertBanner="bottom"
						renderDetailPanel={({ row }) => (
							<>
								<h1 className="text-center">المنتجات</h1>
								<hr className="w-25 m-auto py-4 " />
								<Row className="gap-2">
									{row.original?.products?.map(
										(product, index) => {
											return (
												<Col
													lg={12}
													sm={12}
													xs={12}
													key={index}
													className="d-flex justify-content-center align-items-center gap-3 p-3 mytable-col"
													style={{
														border: "1px solid #000",
														borderRadius: "1rem",
														width: "100%",
													}}
												>
													<div
														className="product-image"
														style={{
															width: "25%",
														}}
													>
														<img
															style={{
																aspectRatio: `1 / 1`,
																width: "100%",
															}}
															src={
																product?.product
																	?.images[0]
																	?.url
															}
															alt={
																product?.product
																	?.title
															}
														/>
													</div>
													<div
														className="product-info w-75 pe-5 h-100 d-flex flex-column justify-content-center gap-3"
														style={{
															borderRight:
																"1px solid #000",
														}}
													>
														<div className="product-name ">
															<h1 className="text-end fw-bolder">
																اسم المنتج
															</h1>
															<p className="fs-4 text-end">
																{
																	product
																		?.product
																		?.title
																}
															</p>
															<hr className="m-0" />
														</div>
														<div className="product-price">
															<h1 className="text-end fw-bolder">
																سعر المنتج
															</h1>
															<p className="fs-4 text-end">
																{
																	product
																		?.product
																		?.newPrice
																}
															</p>
															<hr className="m-0" />
														</div>
														<h1 className="text-end fw-bolder">
															كميه المنتج
														</h1>

														<div className="product-quantity">
															<p className="fs-4 text-end">
																{
																	product?.quantity
																}
															</p>
														</div>
													</div>
												</Col>
											);
										}
									)}
								</Row>
							</>
						)}
						muiTableHeadCellProps={{
							sx: {
								fontSize: "1.6rem",
								"& span": {
									display: "flex",
									justifyContent: "center",
								},
							},
						}}
						muiTableBodyCellProps={{
							sx: {
								textAlign: "right",
								fontSize: "1.3rem",
							},
						}}
						columns={columns}
						data={data?.data?.userOrders ?? []} //data is undefined on first render
						initialState={{
							columnVisibility: {
								// createdAt: false,
								_id: false,
							},
							expanded: {
								0: true,
							},
							// expanded: true,
						}}
						muiToolbarAlertBannerProps={
							isError
								? {
										color: "error",
										children: "Error loading data",
								  }
								: undefined
						}
						state={{
							isLoading: isLoading,
							showAlertBanner: isError,
							showProgressBars: isFetching,
						}}
						enablePagination={true}
						muiTablePaginationProps={{
							rowsPerPageOptions: [5, 10, 15],
							showFirstButton: true,
							showLastButton: true,
						}}
						enableColumnOrdering
					/>
				</div>
			</Layout>
		);
	}
};

export default Orders;
