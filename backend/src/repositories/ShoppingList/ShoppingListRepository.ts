import { db } from '../../database/connection';
import { ShoppingList } from '../../models/ShoppingList/ShoppingList';

function create(shoppingList: ShoppingList): Promise<ShoppingList> {
    return new Promise<ShoppingList>((resolve, reject) => {
        if(shoppingList.isValidForCreate()){

            let params: Array<any> = [shoppingList.name];

            let sql: string = `INSERT INTO shoppinglists (name) VALUES(?)`;

            db.run(sql, params, function(err: Error) {
                if(err) {
                    reject();
                }
                shoppingList.id = this.lastID;
                resolve(shoppingList);
            });
        } else {
            reject();
        }
    });
}

function readAll(): Promise<Array<ShoppingList>> {
    return new Promise<Array<ShoppingList>>((resolve, reject) => {

        let sql: string = `SELECT * FROM shoppinglists`;

        db.all(sql, function(err: Error, rows) {
            if(err) {
                reject();
            }
            resolve(rows);
        });
    });
}

function update(shoppingList: ShoppingList): Promise<ShoppingList> {
    return new Promise<ShoppingList>((resolve, reject) => {
        if(shoppingList.isValidForUpdate()){

            let params: Array<any> = [shoppingList.name];

            let sql: string = `UPDATE shoppinglists SET name = ? WHERE id = ?`;

            db.run(sql, params, function(err: Error) {
                if(err) {
                    reject();
                }
                resolve(shoppingList);
            });
        } else {
            reject();
        }
    });
}

function del(shoppingListId: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        if(Number.isInteger(shoppingListId) && shoppingListId > 0){

            let params: Array<any> = [shoppingListId];

            let sql1: string = `DELETE FROM shoppinglists WHERE id = ?`;
            let sql2: string = `DELETE FROM shopitems WHERE shoppinglist_id = ?`;

            let deletedRows: number = 0;

            db.serialize(() => {
                db.run(sql1, params, function(err:Error){
                    if(err){
                        reject();
                    }
                    deletedRows += this.changes;
                })
                .run(sql2, params, function(err:Error) {
                    if(err){
                        reject();
                    }
                    deletedRows += this.changes;
                    resolve(deletedRows);
                });
            });
        } else {
            reject();
        }
    });
}

export const ShoppingListRepository = {
    create,
    readAll,
    update,
    del
}