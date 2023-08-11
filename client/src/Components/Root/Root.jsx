import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";

const Root = () => {
	return (
		<div>
			<Suspense
				fallback={
					<div className="is-page-loading">
						<HashLoader />
					</div>
				}
			>
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
				<Outlet />
			</Suspense>
		</div>
	);
};

export default Root;
