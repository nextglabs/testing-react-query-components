import { Product } from "./types";

export class StoreApi {
    apiUrl: string;
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    private makeApiCall = async <T>(
        apiPath: string
    ): Promise<T> => {
        const resp = await fetch(`${this.apiUrl}${apiPath}`, {
            headers: {
                Accept: "application/json"
            }
        })

        if (!resp.ok) {
            throw new Error(
                `Error from api call ${apiPath}: status=${resp.status
                } ${await resp.text()}`
            );
        }

        const promise = new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
        })
        await promise;

        return resp.json();
    };

    public getProductById = async (id: string): Promise<Product> => {
        const resp = await this.makeApiCall<Product>(`/products/${id}`);
        if (!resp?.id) {
            // FakeStoreAPI returns an empty object when a product isn't found,
            // So we throw a error.
            throw new Error("Product not found");
        }
        return resp;
    }
}