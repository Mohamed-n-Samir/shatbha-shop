import "./chart.css";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import HashLoader from "react-spinners/HashLoader";
import useQueryCustom from "../../hooks/useQueryCustom";

const Chart = () => {
	const { data, isLoading, isError, isSuccess, isFetching } = useQueryCustom(
		["chartData"],
		"/chart",
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			keepPreviousData: false,
		}
	);

	if (isLoading) {
		return (
			<div className="is-loading">
				<HashLoader />
			</div>
		);
	}

	if (isFetching) {
		return (
			<div className="is-loading">
				<HashLoader  />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="is-error">
				Somthing Went Wrong Try Refresh the Page!!!
			</div>
		);
	}

	if (isSuccess) {
		if (data) {
			const chartData = data.data.chartData;
			const dailyIncome = chartData.flatMap((month) =>
				month.dailyIncome.map((day) => ({
					month: `${day.day}/${month.monthName}`,
					day: day.day,
					totalIncome: day.totalIncome,
				}))
			);

			return (
				<div className="chart p-3">
					<div className="top d-flex align-items-center justify-content-between text-body-tertiary">
						<div className="title fs-3 fw-semibold">ربح الستة اشهر الاخيره</div>
					</div>
					<div className="bottom p-5 d-flex flex-column align-items-center justify-content-center w-100 h100">
                    <ResponsiveContainer  width="100%" aspect={2 / 1}>
						<AreaChart
							width={730}
							height={250}
							data={dailyIncome}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
							
						>
							<defs>
								<linearGradient
									id="totalIncome"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="#8884d8"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="#8884d8"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<XAxis dataKey="month" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" className="chart-grid"/>
							<Tooltip />
							<Area
								type="monotone"
								dataKey="totalIncome"
								stroke="#8884d8"
								fillOpacity={1}
								fill="url(#totalIncome)"
							/>
						</AreaChart>
					</ResponsiveContainer>
                    </div>
				</div>
			);
		}
	}
	// Combine all daily income data for the last 6 months into a single array
};

export default Chart;
