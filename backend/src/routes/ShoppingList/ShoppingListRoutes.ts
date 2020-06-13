import express, { Request, Response } from "express";
import { shoppingListController } from "../../controllers";

export const router = express.Router({
  strict: true,
});

router.post("/", (req: Request, res: Response) => {
  shoppingListController.create(req, res);
});

router.get("/", (req: Request, res: Response) => {
  shoppingListController.read(req, res);
});

router.patch("/", (req: Request, res: Response) => {
  shoppingListController.update(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  shoppingListController.delete(req, res);
});
