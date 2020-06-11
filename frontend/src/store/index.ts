import Vue from "vue";
import Vuex from "vuex";
import { ShoppingList } from "../../../backend/src/models/ShoppingList/ShoppingList";
import { ShopItem } from "../../../backend/src/models/ShopItem/ShopItem";
import { ShoppingListService } from "@/services/api/ShoppingListService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shoppingLists: Array<ShoppingList>(),
    shopItems: Array<ShopItem>()
  },
  mutations: {
    setShoppingLists(state, shoppingLists: Array<ShoppingList>) {
      state.shoppingLists = shoppingLists;
    }
  },
  actions: {
    refreshShoppingLists(context) {
      ShoppingListService.readAllShoppingLists()
        .then((data: Array<ShoppingList>) => {
          context.commit("setShoppingLists", data);
        })
        .catch();
    }
  },
  modules: {}
});
