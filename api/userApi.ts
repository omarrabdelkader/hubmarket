import { User } from "../models/models";

// User's APIs

// Signup
export type SignUpRequest = Pick<
  User,
  "firstName" | "lastName" | "username" | "email" | "password"
>;
export interface SignUpResponse {
  jwt: string;
}

//SignIn

export interface SignInRequest {
  login: string;
  password: string;
}

export type SignInResponse = {
  user: Pick<User, "firstName" | "lastName" | "username" | "email" | "id">;
  jwt: string;
};
