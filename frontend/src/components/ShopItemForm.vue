<template>
  <div class="ShoppingForm">
    <h3>{{ title }}</h3>
    <div>
      <input
        type="text"
        v-model="name"
        name="name"
        placeholder="Item name"
        @keyup="nameFieldChanged"
        @click="nameFieldChanged"
      />
    </div>
    <div>
      <input
        type="number"
        v-model="quantity"
        name="quantity"
        placeholder="0"
        @keyup="quantityFieldChanged"
        @click="quantityFieldChanged"
      />
    </div>
    <div>
      <select name="category" v-model="category">
        <option v-for="(category, index) in categories" :key="index">{{
          category
        }}</option>
      </select>
    </div>
    <div>
      <button @click="submitShopItem">{{ actionText }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ShopItemService } from "../services/api/ShopItemService";
import { ShopItem } from "../../../backend/src/models/ShopItem/ShopItem";

@Component
export default class ShopItemForm extends Vue {
  private categories: Array<string>;
  private category: string;
  private name: string;
  private quantity: number;

  constructor() {
    super();
    this.categories = ["FOOD", "SNACKS", "OTHER"];
    this.category = this.categories[0];
    this.name = "";
    this.quantity = 0;
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

  get trimmedNameForPost(): string {
    return this.name.trim();
  }

  public quantityFieldChanged(): void {
    this.quantity = this.parseQuantity();
  }

  public nameFieldChanged(): void {
    this.name = this.name.replace(/( ) +/, "$1").substring(0, 30);
  }

  public parseQuantity(): number {
    const quantity: number = parseInt(this.quantity.toString());
    return quantity > 0 ? quantity : 0;
  }

  public submitShopItem(): void {
    if (this.createMode) {
      this.createNewShopItem();
    } else {
      this.editShopItem();
    }
  }

  public createNewShopItem(): void {
    ShopItemService.createNewShopItem(
      this.shoppingListId,
      this.name,
      this.category,
      this.parseQuantity()
    ).then((shopItem: ShopItem) => {
      if (shopItem.id) {
        this.clearForm();
        this.actionCompleted();
      }
    });
  }

  public editShopItem(): void {
    ShopItemService.editShopItem(
      this.itemId,
      this.shoppingListId,
      this.name,
      this.category,
      this.quantity
    ).then((shopItem: ShopItem) => {
      if (shopItem.id) {
        this.clearForm();
        this.actionCompleted();
      }
    });
  }

  public clearForm(): void {
    this.name = "";
    this.quantity = 0;
    this.category = this.categories[0];
  }

  @Emit()
  public actionCompleted(): void {
    return;
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
