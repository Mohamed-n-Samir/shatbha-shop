import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DataProvider } from "./context/DataContext";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLoader from "./Components/AppLoader/AppLoader";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<DataProvider>
				<ShoppingCartProvider>
					<AppLoader />
					<ReactQueryDevtools initialIsOpen={true} />
				</ShoppingCartProvider>
			</DataProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
