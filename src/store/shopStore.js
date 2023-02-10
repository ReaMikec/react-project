import { observable, action } from "mobx";

class ShopStore {
  categories = observable([]);

  setCategories = action((categories) => {
    this.categories.replace(categories);
  });
}

export default new ShopStore();
