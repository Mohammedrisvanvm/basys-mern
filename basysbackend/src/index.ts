import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import * as cors from "cors";
import "reflect-metadata";
import adminRouter from "./router/admin.route";
import { errorHandler } from "./middleware/error.middleware";
import userRouter from "./router/user.route";
import AppDataSource from "./data-source";
import { allowedOrigins } from "./middleware/credential.middleware";
import entityRouter from "./router/entity.route";
import path = require("path");
dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;
app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static(path.resolve() + "/public"));
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/entity", entityRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

app.use(errorHandler);
