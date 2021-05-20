import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

test("Renders without crashing", () => {
	const client = new QueryClient();
	render(
		<QueryClientProvider client={client}>
			<App />
		</QueryClientProvider>,
	);
});
