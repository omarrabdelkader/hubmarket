import {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
} from "../api/userApi";
import { Handler } from "../models/models";
import { db } from "../datastore/Datastore";
import { User } from "../models/models";
import crypto from "crypto";
import { signJwt } from "../auth";
export const signUpController: Handler<SignUpRequest, SignUpResponse> = async (
  req,
  res
) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).send({ error: "All fields are required!" });
  }

  const userExists =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));

  if (userExists) {
    return res.status(400).send({ error: "User already exists!" });
  }

  const user: User = {
    id: crypto.randomUUID(),
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  await db.createUser(user);
  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({ jwt });
};

export const signInController: Handler<SignInRequest, SignInResponse> = async (
  req,
  res
) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400);
  }

  const userExists =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!userExists || userExists.password !== password) {
    return res.status(403);
  }

  const jwt = signJwt({ userId: userExists.id });
  return res.status(200).send({
    user: {
      email: userExists.email,
      username: userExists.username,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      id: userExists.id,
    },
    jwt,
  });
};
