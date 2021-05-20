import React from "react";
import { render } from "@testing-library/react";
import { useProduct } from "../hooks/useProduct";
import { ProductDetails } from "./ProductDetails";

// Solves TypeScript Errors
const mockedUseProduct = useProduct as jest.Mock<any>; 

// Mock the module
jest.mock("../hooks/useProduct");

describe("<ProductDetails />", () => {
	beforeEach(() => {
		mockedUseProduct.mockImplementation(() => ({ isLoading: true }));
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Renders without crashing", () => {
		render(<ProductDetails />);
	});

	it("Fetches the correct ID", () => {
		const { rerender } = render(<ProductDetails />);

		// Fetches a default product when `productId` isn't specified (id="1")
		expect(useProduct).toHaveBeenCalledWith("1");

		rerender(<ProductDetails productId="2" />);
		
		expect(useProduct).toHaveBeenCalledWith("2");
		expect(useProduct).toHaveBeenCalledTimes(2);
	});

	it("Displays loading indicator", () => {
		const { getByText } = render(<ProductDetails />);

		expect(getByText(/fetching data.../i)).toBeVisible();
	});

	it("Displays error message", () => {
		mockedUseProduct.mockImplementation(() => ({
			isLoading: false,
			isError: true,
			error: { message: "Unable to fetch the product data" },
		}));
		const { getByText, queryByText } = render(<ProductDetails />);

		expect(queryByText(/fetching data/i)).toBeFalsy(); // We don't want the loading flag to be displayed
		getByText(/unable to fetch the product data/i);
	});

	it("Displays data", () => {
		const mockedProductData = {
			title: "Test Title",
			description: "Test Description",
			price: 123.45,
			category: "Test Category",
			image: "https://example.com/image.jpg",
		};
		mockedUseProduct.mockImplementation(() => ({ isLoading: false, data: mockedProductData }));

		const { getByText, queryByText } = render(<ProductDetails />);

		// We don't want the loading flag to be displayed
		expect(queryByText(/fetching data/i)).toBeFalsy();
		
		getByText(mockedProductData.title);
		getByText(mockedProductData.description);
		getByText(mockedProductData.category);
		getByText(new RegExp(mockedProductData.price.toString()));
	});
});
