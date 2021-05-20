import { useQuery } from "react-query";
import { store } from "../App";
import { Product } from "../services/types";

export const useProduct = (id: string) => {
    return useQuery<Product, Error>(["product", id], () => store.getProductById(id), { retry: false })
}