class Store {
  product = {};

  updateProduct(newProduct) {
    this.product = { ...this.product, ...newProduct };
  }
}

const store = new Store();

export default store;
