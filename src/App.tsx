import React from 'react';
import { Wrapper } from "./components/Wrapper";
import { StoreApi } from "./services/store";

export const store = new StoreApi("https://fakestoreapi.com");

export default function App() {
	return (
		<div className="App">
			<Wrapper />
		</div>
	);
}
