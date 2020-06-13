import { ShopItem } from "../../../../backend/src/models/ShopItem/ShopItem";

async function readAllShopItemsForList(id: number): Promise<Array<ShopItem>> {
  return new Promise((res, rej) => {
    fetch(`/api/shopitems/?shoppinglistid=${id}`)
      .then((data: Response) => {
        if (data.status === 200) {
          return data.json();
        }
        rej();
      })
      .then((list: Array<ShopItem>) => {
        list.reverse();
        res(list);
      })
      .catch(() => {
        rej();
      });
  });
}

async function deleteShopItem(id: number): Promise<number> {
  return new Promise((res, rej) => {
    fetch(`/api/shopitems/${id}`, {
      method: "DELETE"
    })
      .then((data: Response) => data.text())
      .then((text: string) => {
        let deletedRows = 0;
        deletedRows = parseInt(text);
        res(deletedRows);
      })
      .catch(() => {
        rej();
      });
  });
}

async function createNewShopItem(
  shoppingListId: number,
  name: string,
  category: string,
  quantity: number
): Promise<ShopItem> {
  return new Promise((res, rej) => {
    fetch("/api/shopitems", {
      method: "POST",
      body: JSON.stringify({ shoppingListId, name, category, quantity }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data: Response) => data.json())
      .then((json: ShopItem) => {
        res(json);
      })
      .catch(() => {
        rej();
      });
  });
}

async function editShopItem(
  id: number,
  shoppingListId: number,
  name: string,
  category: string,
  quantity: number
): Promise<ShopItem> {
  return new Promise((res, rej) => {
    fetch("/api/shopitems", {
      method: "PATCH",
      body: JSON.stringify({ id, shoppingListId, name, category, quantity }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data: Response) => data.json())
      .then((json: ShopItem) => {
        res(json);
      })
      .catch(() => {
        rej();
      });
  });
}

export const ShopItemService = {
  readAllShopItemsForList,
  deleteShopItem,
  createNewShopItem,
  editShopItem
};
