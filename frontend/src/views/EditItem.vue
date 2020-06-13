<template>
  <div class="List">
    <ShopItemForm
      :createMode="false"
      :titleName="currentItem.name"
      :itemId="currentItem.id"
      :shoppingListId="currentItem.shoppingListId"
      :_name="currentItem.name"
      :_quantity="currentItem.quantity"
      :_category="currentItem.category"
      @action-completed="refreshShopItemsAndRedirect"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
  public refreshShopItemsAndRedirect(): void {
    this.$store.dispatch("refreshShopItems", this.$route.params.id);
    this.$router.push({
      path: `/list/${this.currentItem.shoppingListId}`
    });
  }

  get currentId(): number {
    return parseInt(this.$route.params["id"]) || 0;
  }

  get currentItem(): ShopItem {
    return this.$store.state.shopItems.filter(
      (shopitem: ShopItem) => shopitem.id === this.currentId
    )[0];
  }

  mounted(): void {
    if (this.currentItem === undefined) {
      this.$router.push({ path: "/" });
    }
  }
}
</script>
