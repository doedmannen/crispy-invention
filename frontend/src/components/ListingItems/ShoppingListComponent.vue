<template>
  <div>
    <router-link :to="'/list/' + listId">{{ name }}</router-link>
    <span class="remove" @click="removeList"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ShoppingListService } from "../../services/api/ShoppingListService";

@Component
export default class ShopItemComponent extends Vue {
  @Prop({ required: true }) readonly name!: string;
  @Prop({ required: true }) readonly listId!: number;

  public removeList(): void {
    ShoppingListService.deleteList(this.listId).finally(() => {
      this.listRemovalAction();
    });
  }

  @Emit()
  listRemovalAction(): void {
    return;
  }
}
</script>
