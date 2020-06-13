import { Request, Response } from "express";
import { CrudController } from "../RestController";
import { ShoppingList } from "../../models/ShoppingList/ShoppingList";
import { ShoppingListRepository } from "../../repositories/ShoppingList/ShoppingListRepository";

export class ShoppingListController extends CrudController {
  public create(
    req: Request<
      import("express-serve-static-core").ParamsDictionary,
      ShoppingList,
      ShoppingList,
      import("qs").ParsedQs
    >,
    res: Response<ShoppingList>
  ): void {
    let shoppingList: ShoppingList = Object.assign(
      new ShoppingList(),
      req.body
    );

    ShoppingListRepository.create(shoppingList)
      .then((data: ShoppingList) => {
        res.json(data);
      })
      .catch(() => {
        res.status(500);
        res.send();
      });
  }

  public read(
    req: Request<
      import("express-serve-static-core").ParamsDictionary,
      any,
      any,
      import("qs").ParsedQs
    >,
    res: Response<Array<ShoppingList>>
  ): void {
    ShoppingListRepository.readAll()
      .then((data: Array<ShoppingList>) => {
        res.json(data);
      })
      .catch(() => {
        res.status(500);
        res.send();
      });
  }

  public update(
    req: Request<
      import("express-serve-static-core").ParamsDictionary,
      ShoppingList,
      ShoppingList,
      import("qs").ParsedQs
    >,
    res: Response<ShoppingList>
  ): void {
    let shoppingList: ShoppingList = Object.assign(
      new ShoppingList(),
      req.body
    );

    ShoppingListRepository.update(shoppingList)
      .then((data: ShoppingList) => {
        res.json(data);
      })
      .catch(() => {
        res.status(500);
        res.send();
      });
  }

  public delete(
    req: Request<
      import("express-serve-static-core").ParamsDictionary,
      any,
      any,
      import("qs").ParsedQs
    >,
    res: Response<number>
  ): void {
    let id: number = 0;

    if (typeof req.params.id === "string") {
      id = parseInt(req.params.id);
    }

    ShoppingListRepository.del(id)
      .then((data: number) => {
        res.json(data);
      })
      .catch(() => {
        res.status(500);
        res.send();
      });
  }
}
