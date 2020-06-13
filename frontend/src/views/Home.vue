<template>
  <div class="Home">
    <div>
      <h3>
        Create a new shopping list
        {{ orSelectBelow }}
      </h3>
      <div>
        <input
          type="text"
          v-model="shoppingListName"
          placeholder="A creative name"
          @keyup="watchNameKeyDown"
        />
      </div>
      <div>
        <button @click="createNewShoppingList">Submit</button>
      </div>
    </div>
    <div v-show="shoppingLists.length > 0">
      <ul>
        <li v-for="list in shoppingLists" :key="list.id">
          <ShoppingListComponent
            @list-removal-action="refreshShoppingLists"
            :name="list.name"
            :listId="list.id"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "../store";
import { ShoppingList } from "../../../backend/src/models/ShoppingList/ShoppingList";
import { ShoppingListService } from "../services/api/ShoppingListService";
import ShoppingListComponent from "../components/ListingItems/ShoppingListComponent.vue";

@Component({
  name: "Home",
  components: {
    ShoppingListComponent
  }
})
export default class Home extends Vue {
  private shoppingListName = "";

  public refreshShoppingLists(): void {
    this.$store.dispatch("refreshShoppingLists");
  }

  public watchNameKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.createNewShoppingList();
    }
  }

  public createNewShoppingList(): void {
    const name = this.shoppingListName
      .trim()
      .replace(/( ) +/, "$1")
      .substring(0, 30);
    ShoppingListService.createNewShoppingList(name).then(() => {
      this.shoppingListName = "";
      this.refreshShoppingLists();
    });
  }

  get shoppingLists(): Array<ShoppingList> {
    return this.$store.state.shoppingLists;
  }

  get orSelectBelow(): string {
    return this.$store.state.shoppingLists.length > 0
      ? "or select one from below"
      : "";
  }

  async mounted() {
    await this.refreshShoppingLists();
  }
}
</script>
