import React from "react";
import { Box } from "@chakra-ui/react";
import { ProductDetails } from "./ProductDetails";

export const Wrapper = () => {
	// Allow the use of query parameters to define the id of the product to be fetched
	const { searchParams } = new URL(window.location.href);
	const productId = searchParams.get("id") || "1";

	return (
		<Box display="flex" alignItems="center" justifyContent="center" height="100vh" background="gray.200">
			<Box
				maxW="lg"
				minW="sm"
				borderRadius="lg"
				overflow="hidden"
				m="10"
				p="10"
				shadow="xl"
				background="white"
				textAlign="center"
			>
				<ProductDetails productId={productId} />
			</Box>
		</Box>
	);
};
