import "./featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useQueryCustom from "../../hooks/useQueryCustom";
import HashLoader from "react-spinners/HashLoader";

const Featured = () => {
	const { data, isLoading, isError, isSuccess, isFetching } = useQueryCustom(
		["revenueData"],
		"featured",
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
				<HashLoader />
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
			const income = data.data.allIncomes;
			return (
				<div className="featured p-3 text-center">
					<div className="top d-flex align-items-center justify-content-between text-body-tertiary">
						<h1 className="title fs-3 fw-semibold">كامل الارباح</h1>
						<MoreVertIcon fontSize="1.8rem" />
					</div>
					<div className="bottom p-5 d-flex flex-column align-items-center gap-4">
						<div className="featured-chart">
							<CircularProgressbar
								value={income.todayPercentageChange}
								text={`${income.todayPercentageChange}%`}
								strokeWidth={5}
							/>
						</div>
						<p className="title">كامل الارباح لليوم</p>
						<p className="amount fs-1 fw-light text-body-tertiary ">{`$${income.todayRevenue}`}</p>
						<p className="desc ">
							معالجة المعاملات السابقة. قد لا يتم تضمين الدفعات
							الأخيرة.
						</p>
						<div className="summary w-100 d-flex align-items-center justify-content-between">
							<div className="item ">
								<div className="item-title fs-3 text-body-tertiary">
									هذا العام
								</div>
								<div
									className={`item-result d-flex mt-2  justify-content-center align-items-center ${
										isPositive(
											income.thisYearIncreaseAmount
										)
											? "text-success"
											: "text-danger"
									}`}
								>
									{isPositive(
										income.thisYearIncreaseAmount
									) ? (
										<KeyboardArrowUpIcon className="icon" />
									) : (
										<KeyboardArrowDownIcon className="icon" />
									)}

									<div className="result-amount">{`$${income.thisYearIncreaseAmount}`}</div>
								</div>
							</div>
							<div className="item ">
								<div className="item-title">هذا الاسبوع</div>
								<div
									className={`item-result d-flex mt-2  justify-content-center align-items-center ${
										isPositive(
											income.thisYearIncreaseAmount
										)
											? "text-success"
											: "text-danger"
									}`}
								>
									{isPositive(
										income.thisWeekIncreaseAmount
									) ? (
										<KeyboardArrowUpIcon className="icon" />
									) : (
										<KeyboardArrowDownIcon className="icon" />
									)}
									<div className="result-amount">{`$${income.thisWeekIncreaseAmount}`}</div>
								</div>
							</div>
							<div className="item ">
								<div className="item-title fs-3 text-body-tertiary">
									هذا الشهر
								</div>
								<div
									className={`item-result d-flex mt-2  justify-content-center align-items-center ${
										isPositive(
											income.thisYearIncreaseAmount
										)
											? "text-success"
											: "text-danger"
									}`}
								>
									{isPositive(
										income.thisMonthIncreaseAmount
									) ? (
										<KeyboardArrowUpIcon className="icon" />
									) : (
										<KeyboardArrowDownIcon className="icon" />
									)}
									<div className="result-amount">{`$${income.thisMonthIncreaseAmount}`}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
};

function isPositive(value) {
	if (value > 0) {
		return true;
	}
	return false;
}

export default Featured;
