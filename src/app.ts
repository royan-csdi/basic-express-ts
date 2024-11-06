import express, { Request, Response } from "express";
import router from "./routes";
import logger from "morgan";
import { errorHandler, errorHandlerSimple } from "./middlewares";

const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
