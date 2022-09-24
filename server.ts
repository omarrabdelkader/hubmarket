import express from "express";
import {
  listProductController,
  createProductController,
} from "./controllers/productHandler";
import { errorController } from "./middlewares/errorMiddleware";
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore/Datastore";
import { signUpController, signInController } from "./controllers/userHandler";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware";

(async () => {
  await initDb();

  dotenv.config();

  const port = process.env.PORT;
  const app = express();

  app.use(express.json());

  //Users - Public End-point

  app.post("/v1/signup", asyncHandler(signUpController));
  app.post("/v1/signin", asyncHandler(signInController));

  app.use(authMiddleware);

  //Products - Protected End-point

  app.get("/v1/products", asyncHandler(listProductController));
  app.post("/v1/products", asyncHandler(createProductController));

  app.use(errorController);

  app.listen(port, () => {
    console.log(`Server has been connected successfully at PORT: ${port}`);
  });
})();
