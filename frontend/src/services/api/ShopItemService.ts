import { ShopItem } from '../../../../src/models/ShopItem/ShopItem';

async function addShopItem(){

}

async function updateShopItem(){

}

async function readAllShopItemsForList(id:number): Promise<Array<ShopItem>>{
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

async function deleteShopItem(){

}

export const ShopItemService = {
    addShopItem,
    updateShopItem,
    readAllShopItemsForList, 
    deleteShopItem
}