<template>
  <div>
    {{ category }}: {{ name }} ({{ quantity }})
    <span class="edit" @click="goToEdit"></span>
    <span class="remove" @click="removeItem"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ShopItemService } from "../../services/api/ShopItemService";

@Component
export default class ShopItemComponent extends Vue {
  @Prop({ required: true }) readonly itemId!: number;
  @Prop({ required: true }) readonly name!: string;
  @Prop({ required: true }) readonly category!: string;
  @Prop({ required: true }) readonly quantity!: number;

  public removeItem(): void {
    ShopItemService.deleteShopItem(this.itemId).finally(() => {
      this.itemRemovalAction();
    });
  }

  public goToEdit(): void {
    this.$router.push({ path: `/edit/${this.itemId}` });
  }

  @Emit()
  itemRemovalAction(): void {
    return;
  }
}
</script>
