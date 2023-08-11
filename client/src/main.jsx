import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DataProvider } from "./context/DataContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLoader from "./Components/AppLoader/AppLoader";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<DataProvider>
				<AppLoader />
			</DataProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
