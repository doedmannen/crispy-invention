export class ShopItem {
    id: number;
    shoppingListId: number;
    name: string;
    category: string;
    quantity: number;

    constructor() {
        this.id = 0;
        this.shoppingListId = 0;
        this.name = '';
        this.category = '';
        this.quantity = 0;
    }

    hasValidId(): boolean {
        return Number.isInteger(this.id) && this.id > 0;
    }

    hasValidShoppingListId(): boolean {
        return Number.isInteger(this.shoppingListId) && this.shoppingListId > 0; 
    }

    hasValidName(): boolean {
        return typeof this.name === 'string' && this.name.trim().length > 0;
    }

    hasValidCategory(): boolean {
        return typeof this.name === 'string' && this.category.trim().length > 0;
    }

    hasValidQuantity(): boolean {
        return Number.isInteger(this.quantity) && this.quantity > 0; 
    }

    isValidForCreate(): boolean {
        return !this.hasValidId() && 
        this.hasValidName() &&
        this.hasValidCategory() &&
        this.hasValidQuantity() && 
        this.hasValidShoppingListId();
    }

    isValidForUpdate(): boolean {
        return this.hasValidId() && 
        this.hasValidName() &&
        this.hasValidCategory() &&
        this.hasValidQuantity() && 
        this.hasValidShoppingListId();
    }

}
