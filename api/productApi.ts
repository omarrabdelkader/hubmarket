// Product's APIs

import { Product } from "../models/models";

//List
export interface ListProductRequest {
  products: Product[];
}
export interface ListProductResponse {
  products: Product[];
}

// Create
export type CreateProductRequest = Pick<Product, "title" | "price" | "company">;
export interface CreateProductResponse {}

// Get
export interface GetProductRequest {
  product: Product;
}
export interface GetProductResponse {}
