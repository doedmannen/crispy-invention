<template>
  <div class="Home">
    <div>
      <p>
        Create a new shopping list
        {{ orSelectBelow }}
      </p>
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
          <router-link :to="'/list/' + list.id">{{ list.name }}</router-link>
          <span class="remove" @click="removeList(list.id)"></span>
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

@Component({
  name: "Home"
})
export default class Home extends Vue {
  private shoppingListName = "";

  public refreshShoppingLists(): void {
    this.$store.dispatch("refreshShoppingLists");
  }

  public watchNameKeyDown(e: KeyboardEvent): void {
    this.shoppingListName = this.shoppingListName.substring(0, 30);

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

  public removeList(id: number): void {
    ShoppingListService.deleteList(id).finally(() => {
      this.refreshShoppingLists();
    });
  }

  get shoppingLists(): ShoppingList {
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

<style scoped lang="scss">
div.Home {
  ul {
    padding-top: 20px;
    padding-left: 0;
    li {
      list-style: none;
      margin-bottom: 10px;
      a {
        font-size: 16pt;
      }
    }
  }
}
</style>
