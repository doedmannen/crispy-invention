import express, { Router } from "express";
import { PORT } from "./config/constants";
import { shoppingListRouter, shopItemRouter } from "./routes";
import { connectToDatabaseAndStartApplication } from "./database/connection";
const app = express();

app.use(express.json());
app.use(express.static("wwwroot"));

app.use("/api/shoppinglists", shoppingListRouter);
app.use("/api/shopitems", shopItemRouter);

export function startApplication() {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

connectToDatabaseAndStartApplication();
