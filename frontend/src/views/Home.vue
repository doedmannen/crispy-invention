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
          @keydown="nameFieldKeyDown"
        />
      </div>
      <div class="error">{{ nameError }}</div>
      <div>
        <button @click="submitNewList">Add</button>
        <button @click="clearInputFields">Clear</button>
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
import { InputParser } from "../services/parsers/InputParser";
import { Validator } from "../services/validators/Validator";

@Component({
  name: "Home",
  components: {
    ShoppingListComponent
  }
})
export default class Home extends Vue {
  private shoppingListName: string;
  private nameError: string;

  constructor() {
    super();
    this.shoppingListName = "";
    this.nameError = "";
  }

  public refreshShoppingLists(): void {
    this.$store.dispatch("refreshShoppingLists");
  }

  public nameFieldKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.submitNewList();
    }
  }

  public submitNewList(): void {
    this.shoppingListName = InputParser.stripName(this.shoppingListName);
    if (this.validateInput()) {
      this.createNewShoppingList();
    }
  }

  public clearInputFields(): void {
    this.shoppingListName = "";
    this.nameError = "";
  }

  public createNewShoppingList(): void {
    const name = this.shoppingListName
      .trim()
      .replace(/( ) +/, "$1")
      .substring(0, 30);
    ShoppingListService.createNewShoppingList(name)
      .then(() => {
        this.clearInputFields();
        this.refreshShoppingLists();
      })
      .catch(() => {
        // Empty catch
      });
  }

  public validateInput(): boolean {
    this.nameError = "";
    let output = true;
    if (!Validator.isValidName(this.shoppingListName)) {
      this.nameError = "Name must be 1-30 characters long.";
      output = false;
    }
    return output;
  }

  get shoppingLists(): Array<ShoppingList> {
    return this.$store.state.shoppingLists;
  }

  get orSelectBelow(): string {
    return this.$store.state.shoppingLists.length > 0
      ? "or select one from below"
      : "";
  }

  mounted(): void {
    this.refreshShoppingLists();
  }
}
</script>
