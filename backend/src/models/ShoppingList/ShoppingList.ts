export class ShoppingList {
  id: number;
  name: string;

  constructor() {
    this.id = 0;
    this.name = "";
  }

  hasValidId(): boolean {
    return Number.isInteger(this.id) && this.id > 0;
  }

  hasValidName(): boolean {
    return (
      typeof this.name === "string" &&
      this.name.trim().length > 0 &&
      this.name.length <= 30
    );
  }

  isValidForCreate(): boolean {
    return !this.hasValidId() && this.hasValidName();
  }

  isValidForUpdate(): boolean {
    return this.hasValidId && this.hasValidName();
  }
}
