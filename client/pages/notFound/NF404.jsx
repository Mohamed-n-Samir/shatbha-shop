import NF404 from "../../src/Components/NotFound/NF404";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

const NF404Page = () => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>404</title>
				<meta
					name="robots"
					content="noindex,nofollow,noarchive,nosnippet"
				/>
				<meta name="description" content="page Not Found" />
				<meta name="author" content="Mohamed Samir" />
			</Helmet>
			<NF404 />
		</HelmetProvider>
	);
};

export default NF404Page;
