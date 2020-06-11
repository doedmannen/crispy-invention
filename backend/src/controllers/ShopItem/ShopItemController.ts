import { Request, Response } from 'express';
import { CrudController } from '../RestController';
import { ShopItem } from '../../models/ShopItem/ShopItem';
import { ShopItemRepository } from '../../repositories/ShopItem/ShopItemRepository';

export class ShopItemController extends CrudController {

    public create(req: Request<import("express-serve-static-core").ParamsDictionary, ShopItem, ShopItem, import("qs").ParsedQs>, res: Response<ShopItem>): void {

        let shopItem: ShopItem = Object.assign(new ShopItem(), req.body);

        ShopItemRepository.create(shopItem)
        .then((data: ShopItem) => {
            res.json(data);
        }).catch(() => {
            res.status(500);
            res.send();
        });

    }

    public read(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<Array<ShopItem>>): void {

        let shoppingListId: number = 0;

        if(typeof req.query.shoppinglistid === 'string'){
            shoppingListId = parseInt(req.query.shoppinglistid)
        }

        ShopItemRepository.readAllFromShoppingList(shoppingListId)
        .then((data: Array<ShopItem>) => {
            res.json(data);
        }).catch(() => {
            res.status(500);
            res.send();
        })

    }

    public update(req: Request<import("express-serve-static-core").ParamsDictionary, ShopItem, ShopItem, import("qs").ParsedQs>, res: Response<ShopItem>): void {

            let shopItem: ShopItem = Object.assign(new ShopItem(), req.body);

            ShopItemRepository.update(shopItem)
            .then((data: ShopItem) => {
                res.json(data);
            }).catch(() => {
                res.status(500);
                res.send();
            });

    }

    public delete(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<number>): void {

        let id: number = 0;
        
        if(typeof req.params.id === 'string'){
            id = parseInt(req.params.id);
        }
        
        ShopItemRepository.del(id)
        .then((data: number) => {
            res.json(data); 
        }).catch(()=> {
            res.status(500);
            res.send();
        })

    }

}