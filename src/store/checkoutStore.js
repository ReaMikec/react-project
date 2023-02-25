import { makeAutoObservable } from "mobx";

class CheckoutStore {
  cartItems = [];

  constructor() {
    makeAutoObservable(this);
  }

  get total() {
    return this.cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);
  }

  addCartItem(cartItem) {
    this.cartItems.push(cartItem);
  }

  removeCartItem(id) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== id);
  }
}

const checkoutStore = new CheckoutStore();
export default checkoutStore;
