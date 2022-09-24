import { JwtObject } from "./models/models";
import jwt from "jsonwebtoken";

export function signJwt(object: JwtObject): string {
  return jwt.sign(object, getJwtSecret(), {
    expiresIn: "30d",
  });
}

export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT secret is not found!");
    process.exit(1);
  }
  return jwtSecret;
}
