import { verifyJwt } from "../auth";
import { Handler } from "../models/models";
import { db } from "../datastore/Datastore";

export const authMiddleware: Handler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);

    if (!user) {
      throw new Error("Not found!");
    }

    next();
  } catch {
    return res.sendStatus(401);
  }
};
