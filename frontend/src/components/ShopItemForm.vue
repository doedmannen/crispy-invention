<template>
  <div class="ShoppingForm">
    <h3>{{ title }}</h3>
    <div>
      <div>
        Name:
      </div>
      <div>
        <input
          type="text"
          v-model="name"
          name="name"
          placeholder="Item name"
          @keydown="nameFieldKeyDown"
        />
      </div>
      <div class="error">{{ nameError }}</div>
    </div>
    <div>
      <div>
        Quantity:
      </div>
      <div>
        <input
          type="number"
          v-model="quantity"
          name="quantity"
          placeholder="0"
          @keyup="quantityFieldKeyDown"
          @click="quantityFieldChanged"
        />
      </div>
      <div class="error">{{ quantityError }}</div>
    </div>
    <div>
      <div>
        Category:
      </div>
      <div>
        <select name="category" v-model="category">
          <option v-for="(category, index) in categories" :key="index">{{
            category
          }}</option>
        </select>
      </div>
    </div>
    <div>
      <button @click="submitShopItem">{{ actionText }}</button>
      <button @click="cancelAction">{{ cancelText }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ShopItemService } from "../services/api/ShopItemService";
import { ShopItem } from "../../../backend/src/models/ShopItem/ShopItem";
import { InputParser } from "../services/parsers/InputParser";
import { Validator } from "../services/validators/Validator";

@Component
export default class ShopItemForm extends Vue {
  private categories: Array<string>;
  private category: string;
  private name: string;
  private quantity: number;
  private nameError: string;
  private quantityError: string;

  constructor() {
    super();
    this.categories = ["FOOD", "SNACKS", "OTHER"];
    this.category = this.categories[0];
    this.name = "";
    this.quantity = 0;
    this.quantityError = "";
    this.nameError = "";
  }

  @Prop({ required: true }) readonly createMode!: boolean;
  @Prop({ required: true }) readonly titleName!: string;
  @Prop() readonly _name!: string;
  @Prop() readonly _category!: string;
  @Prop() readonly _quantity!: number;
  @Prop() readonly itemId!: number;
  @Prop() readonly shoppingListId!: number;

  get title(): string {
    return this.createMode
      ? `Create new item for ${this.titleName}`
      : `Edit ${this.titleName}`;
  }

  get actionText(): string {
    return this.createMode ? "Add" : "Save";
  }

  get cancelText(): string {
    return this.createMode ? "Clear" : "Cancel";
  }

  public quantityFieldKeyDown(e: KeyboardEvent): void {
    this.quantityFieldChanged();
    this.submitIfKeyIsEnter(e.keyCode);
  }

  public nameFieldKeyDown(e: KeyboardEvent): void {
    this.submitIfKeyIsEnter(e.keyCode);
  }

  public quantityFieldChanged(): void {
    this.quantity = InputParser.parseQuantity(this.quantity.toString());
  }

  public submitIfKeyIsEnter(keyCode: number) {
    if (keyCode === 13) {
      this.submitShopItem();
    }
  }

  public submitShopItem(): void {
    if (this.validateForm()) {
      if (this.createMode) {
        this.createNewShopItem();
      } else {
        this.editShopItem();
      }
    }
  }

  public validateForm(): boolean {
    let valid = true;
    this.quantityError = "";
    this.nameError = "";
    if (!Validator.isValidName(this.name)) {
      this.nameError = "Name must be 1-30 characters long.";
      valid = false;
    }
    if (!Validator.isValidQuantity(this.quantity)) {
      this.quantityError = "Quantity must be 1-999.";
      valid = false;
    }
    return valid;
  }

  public createNewShopItem(): void {
    ShopItemService.createNewShopItem(
      this.shoppingListId,
      InputParser.stripName(this.name),
      this.category,
      InputParser.parseQuantity(this.quantity.toString())
    )
      .then((shopItem: ShopItem) => {
        if (shopItem.id) {
          this.clearForm();
          this.actionCompleted();
        }
      })
      .catch(() => {
        // Empty catch
      });
  }

  public editShopItem(): void {
    ShopItemService.editShopItem(
      this.itemId,
      this.shoppingListId,
      InputParser.stripName(this.name),
      this.category,
      InputParser.parseQuantity(this.quantity.toString())
    )
      .then((shopItem: ShopItem) => {
        if (shopItem.id) {
          this.actionCompleted();
        }
      })
      .catch(() => {
        // Empty catch
      });
  }

  public clearForm(): void {
    this.name = "";
    this.quantity = 0;
    this.category = this.categories[0];
    this.nameError = "";
    this.quantityError = "";
  }

  @Emit()
  public actionCompleted(): void {
    this.clearForm();
  }

  @Emit()
  public cancelAction(): void {
    this.clearForm();
  }

  mounted(): void {
    if (!this.createMode) {
      this.name = this._name;
      this.quantity = this._quantity;
      this.category = this._category;
    }
  }
}
</script>
