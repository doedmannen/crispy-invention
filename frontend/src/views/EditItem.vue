<template>
  <div class="List" v-if="currentItem !== undefined">
    <ShopItemForm
      :createMode="false"
      :titleName="currentItem.name"
      :itemId="currentItem.id"
      :shoppingListId="currentItem.shoppingListId"
      :_name="currentItem.name"
      :_quantity="currentItem.quantity"
      :_category="currentItem.category"
      @action-completed="refreshShopItemsAndRedirect"
      @cancel-action="redirectBack"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import "../store";
import ShopItemForm from "../components/ShopItemForm.vue";
import { ShopItem } from "../../../backend/src/models/ShopItem/ShopItem";

@Component({
  name: "List",
  components: {
    ShopItemForm
  }
})
export default class EditItem extends Vue {
  get currentId(): number {
    return parseInt(this.$route.params["id"]) || 0;
  }

  get currentItem(): ShopItem {
    return this.$store.state.shopItems.filter(
      (shopitem: ShopItem) => shopitem.id === this.currentId
    )[0];
  }

  public refreshShopItemsAndRedirect(): void {
    this.$store.dispatch("refreshShopItems", this.$route.params.id);
    this.redirectBack();
  }

  public redirectBack(): void {
    this.$router.push({
      path: `/list/${this.currentItem.shoppingListId}`
    });
  }

  public redirectIfInvalidShopItem(): void {
    if (this.currentItem === undefined) {
      this.$router.push({ path: "/" });
    }
  }

  @Watch("$route", { immediate: true, deep: true })
  routeChanged(): void {
    this.redirectIfInvalidShopItem();
  }

  mounted(): void {
    this.redirectIfInvalidShopItem();
  }
}
</script>
