import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import "./widget.css";


const widget = ({ type }) => {
	let data;
	switch (type) {
		case "users":
			data = {
				title: "المستخدمين",
				counter: "21312",
				link: "شاهد جميع المستخدمين",
				percentage: "20%",
				icon: <PersonOutlinedIcon className="icon" />,
			};
			break;

		case "lectures":
			data = {
				title: "المنتجات",
				counter: "21312",
				link: "شاهد جميع المنتجات",
				percentage: "20%",
				icon: <ClassOutlinedIcon className="icon" />,
			};
			break;

		case "earnings":
			data = {
				title: "الارباح",
				counter: "21312",
				link: "شاهد جميع الارباح",
				percentage: "20%",
				icon: <MonetizationOnOutlinedIcon className="icon" />,
			};
			break;

		case "balance":
			data = {
				title: "الميزانية",
				counter: "21312",
				link: "شاهد جميع الميزانية",

				percentage: "20%",
				icon: <AccountBalanceWalletOutlinedIcon className="icon" />,
			};
			break;
		default:
			break;
	}

	return (
		<div className="widget d-flex p-3 justify-content-between">
			<div className="left d-flex flex-column justify-content-between">
				<span className="title fs-3 fw-bold text-body-tertiary">{data.title}</span>
				<span className="counter fs-1 fw-light">{data.counter}</span>
				<span className="wid-link fs-5">{data.link}</span>
			</div>
			<div className="right d-flex flex-column justify-content-between">
				<div className="fs-3 d-flex align-items-center text-success">
					<KeyboardArrowUpIcon className="fs-3"/> {data.percentage}
				</div>
				{data.icon}
			</div>
		</div>
	);
};

export default widget;
