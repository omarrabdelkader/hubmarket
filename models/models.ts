import { RequestHandler } from "express";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  receivedAt: number;
  company: string;
}

export interface JwtObject {
  userId: string;
}

type WithError<T> = T & { error: string };
export type Handler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
