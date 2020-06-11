import { ShopItem } from "../../../../backend/src/models/ShopItem/ShopItem";

async function readAllShopItemsForList(id: number): Promise<Array<ShopItem>>{
    return new Promise(async (res, rej) => {
        await fetch('/api/shop')
        .then(async (data:Response) => {
            data.json()
            .then((list:Array<ShopItem>) => {
                res(list);
            }).catch(() => {
                rej();
            })
        })
        .catch(() => {
            rej();
        })
    });

}

export const ShopItemService = {
    readAllShopItemsForList
}