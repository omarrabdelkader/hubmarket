import { db } from "../datastore/Datastore";
import { Handler } from "../models/models";
import crypto from "crypto";
import {
  ListProductRequest,
  ListProductResponse,
  CreateProductRequest,
  CreateProductResponse,
} from "../api/productApi";
export const listProductController: Handler<
  ListProductRequest,
  ListProductResponse
> = async (req, res) => {
  res.send({ products: await db.listProducts() });
};

export const createProductController: Handler<
  CreateProductRequest,
  CreateProductResponse
> = async (req, res) => {
  const { title, price, company } = req.body;

  if (!title || !price || !company) {
    return res.status(400).send({ error: "All fields are required!" });
  }

  const product = {
    id: crypto.randomUUID(),
    title: title,
    price: price,
    receivedAt: Date.now(),
    company: company,
  };

  await db.createProduct(product);
};
