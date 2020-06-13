<template>
  <div class="List" v-if="currentList !== undefined">
    <ShopItemForm
      :createMode="true"
      :titleName="listName"
      :shoppingListId="shoppingListId"
      @action-completed="refreshShopItems"
    />

    <ul>
      <li v-for="shopItem in shopItems" :key="shopItem.id">
        <ShopItemComponent
          :itemId="shopItem.id"
          :name="shopItem.name"
          :category="shopItem.category"
          :quantity="shopItem.quantity"
          @item-removal-action="refreshShopItems"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import "../store";
import ShopItemForm from "../components/ShopItemForm.vue";
import ShopItemComponent from "../components/ListingItems/ShopItemComponent.vue";
import { ShopItem } from "../../../backend/src/models/ShopItem/ShopItem";
import { ShoppingList } from "../../../backend/src/models/ShoppingList/ShoppingList";

@Component({
  name: "List",
  components: {
    ShopItemForm,
    ShopItemComponent
  }
})
export default class List extends Vue {
  get listName(): string {
    if (this.currentList !== undefined) {
      return this.currentList.name;
    }
    return "";
  }

  get currentList(): ShoppingList {
    return this.$store.state.shoppingLists.filter(
      (list: ShoppingList) => list.id === this.shoppingListId
    )[0];
  }

  get shoppingListId(): number {
    return parseInt(this.$route.params["id"]);
  }

  get shopItems(): ShopItem {
    return this.$store.state.shopItems;
  }

  public refreshShopItems(): void {
    this.$store.dispatch("refreshShopItems", this.$route.params.id);
  }

  public redirectIfInvalidShoppingList(): void {
    if (this.currentList === undefined) {
      this.$router.push({ path: "/" });
    }
  }

  @Watch("$route", { immediate: true, deep: true })
  routeChanged(): void {
    this.redirectIfInvalidShoppingList();
  }

  mounted(): void {
    this.redirectIfInvalidShoppingList();
    this.refreshShopItems();
  }
}
</script>
