import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

// Initialize React-Query Client
const client = new QueryClient();

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<QueryClientProvider client={client}>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</QueryClientProvider>
	</StrictMode>,
	rootElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
