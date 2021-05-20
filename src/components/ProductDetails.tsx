import React from "react";
import {
	Badge,
	Box,
	Heading,
	Spinner,
	Text,
	VStack,
	Image,
	Button,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
import { useProduct } from "../hooks/useProduct";

export interface ProductDetailsProps {
	/**
	 * The ID of the product to be displayed
	 * @default "1"
	 */
	productId?: string;
}
export const ProductDetails = ({ productId = "1" }: ProductDetailsProps) => {
	const { isLoading, isError, error, data } = useProduct(productId);
	if (isLoading) {
		return (
			<Box>
				<Spinner />
				<Text>Fetching Data...</Text>
			</Box>
		);
	}

	if (isError) {
		return (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle mr={2}>Error</AlertTitle>
				<AlertDescription>{error?.message}</AlertDescription>
			</Alert>
		);
	}

	const { title, price, description, category, image } = data || {};

	return (
		<Box>
			<VStack spacing="3">
				<Image src={image} boxSize="150px" data-testid="product-image"/>
				<Badge borderRadius="full" px="2" colorScheme="pink">
					{category}
				</Badge>
				<Heading size="lg">{title}</Heading>
				<Text>{description}</Text>
				<Button colorScheme="blue">Buy Now &bull; ${price}</Button>
			</VStack>
		</Box>
	);
};
