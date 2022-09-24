import { Product } from "../../models/models";

export interface ProductDoa {
  listProducts(): Promise<Product[]>;
  createProduct(product: Product): Promise<void>;
  getProductById(id: string): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;
}
