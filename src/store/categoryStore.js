import { makeAutoObservable } from "mobx";

class CategoryStore {
  sortedProducts = [];
  showAddForm = false;
  newProduct = {
    name: "",
    size: "",
    material: "",
    price: 0,
    imageUrl: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSortedProducts(products) {
    this.sortedProducts = products;
  }

  setShowAddForm(showForm) {
    this.showAddForm = showForm;
  }

  setNewProductValue(name, value) {
    this.newProduct[name] = value;
  }

  resetNewProduct() {
    this.newProduct = {
      name: "",
      size: "",
      material: "",
      price: 0,
      imageUrl: "",
    };
  }

  setNewProduct(product) {
    this.newProduct = product;
  }
}

export default new CategoryStore();
