import Vue from "vue";
import Vuex from "vuex";
import { ShoppingList } from "../../../backend/src/models/ShoppingList/ShoppingList";
import { ShopItem } from "../../../backend/src/models/ShopItem/ShopItem";
import { ShoppingListService } from "@/services/api/ShoppingListService";
import { ShopItemService } from "@/services/api/ShopItemService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shoppingLists: Array<ShoppingList>(),
    shopItems: Array<ShopItem>()
  },
  mutations: {
    setShopItems(state, shopItems: Array<ShopItem>) {
      state.shopItems = shopItems;
    },
    setShoppingLists(state, shoppingLists: Array<ShoppingList>) {
      state.shoppingLists = shoppingLists;
    }
  },
  actions: {
    refreshShopItems(context, id: number) {
      ShopItemService.readAllShopItemsForList(id)
        .then((data: Array<ShopItem>) => {
          context.commit("setShopItems", data);
        })
        .catch();
    },
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
