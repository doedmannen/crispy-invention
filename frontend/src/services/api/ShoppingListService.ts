import { ShoppingList } from "../../../../backend/src/models/ShoppingList/ShoppingList";

async function readAllShoppingLists(): Promise<Array<ShoppingList>> {
  return new Promise((res, rej) => {
    fetch("/api/shoppinglists")
      .then((data: Response) => data.json())
      .then((list: Array<ShoppingList>) => {
        list.reverse();
        res(list);
      })
      .catch(() => {
        rej();
      });
  });
}

async function deleteList(id: number): Promise<number> {
  return new Promise((res, rej) => {
    fetch(`/api/shoppinglists/${id}`, {
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

async function createNewShoppingList(name: string): Promise<ShoppingList> {
  return new Promise((res, rej) => {
    fetch("/api/shoppinglists", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data: Response) => data.json())
      .then((json: ShoppingList) => {
        res(json);
      })
      .catch(() => {
        rej();
      });
  });
}

export const ShoppingListService = {
  readAllShoppingLists,
  createNewShoppingList,
  deleteList
};
