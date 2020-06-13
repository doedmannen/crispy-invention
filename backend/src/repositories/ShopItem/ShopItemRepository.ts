import { db } from "../../database/connection";
import { ShopItem } from "../../models/ShopItem/ShopItem";

function create(shopItem: ShopItem): Promise<ShopItem> {
  return new Promise<ShopItem>((resolve, reject) => {
    if (shopItem.isValidForCreate()) {
      let params: Array<any> = [
        shopItem.shoppingListId,
        shopItem.name,
        shopItem.category,
        shopItem.quantity,
        shopItem.shoppingListId,
      ];

      let sql: string = `INSERT INTO shopitems (shoppinglist_id, name, category, quantity) SELECT ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM shoppinglists WHERE id = ?)`;

      db.run(sql, params, function (err: Error) {
        if (err) {
          reject();
        }
        shopItem.id = this.lastID;
        resolve(shopItem);
      });
    } else {
      reject();
    }
  });
}

function readAllFromShoppingList(
  shoppingListId: number
): Promise<Array<ShopItem>> {
  return new Promise<Array<ShopItem>>((resolve, reject) => {
    if (Number.isInteger(shoppingListId) && shoppingListId > 0) {
      let params: Array<any> = [shoppingListId];

      let sql: string = `SELECT id, name, category, quantity, shoppinglist_id AS shoppingListId FROM shopitems WHERE shoppinglist_id = ?`;

      db.all(sql, params, function (err: Error, rows) {
        if (err) {
          reject();
        }
        resolve(rows);
      });
    } else {
      reject();
    }
  });
}

function update(shopItem: ShopItem): Promise<ShopItem> {
  return new Promise<ShopItem>((resolve, reject) => {
    if (shopItem.isValidForUpdate()) {
      let params: Array<any> = [
        shopItem.shoppingListId,
        shopItem.name,
        shopItem.category,
        shopItem.quantity,
        shopItem.id,
      ];

      let sql: string = `UPDATE shopitems SET shoppinglist_id = ?, name = ?, category = ?, quantity = ? WHERE id = ?`;

      db.run(sql, params, function (err: Error) {
        if (err) {
          reject();
        }
        resolve(shopItem);
      });
    } else {
      reject();
    }
  });
}

function del(shopItemId: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    if (Number.isInteger(shopItemId) && shopItemId > 0) {
      let params: Array<any> = [shopItemId];

      let sql: string = `DELETE FROM shopitems WHERE id = ?`;

      db.run(sql, params, function (err: Error) {
        if (err) {
          reject();
        }
        resolve(this.changes);
      });
    } else {
      reject();
    }
  });
}

export const ShopItemRepository = {
  create,
  readAllFromShoppingList,
  update,
  del,
};
