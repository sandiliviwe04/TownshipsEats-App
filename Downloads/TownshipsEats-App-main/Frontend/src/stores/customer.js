// Frontend/src/stores/customer.js
import { defineStore } from 'pinia';

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    deliveryFee: 25.00, // Static for now
  }),
  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    totalWithDelivery: (state) => {
      return state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) + state.deliveryFee;
    },
    cartItemCount: (state) => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0);
    },
  },
  actions: {
    addToCart(item, quantity = 1) {
      const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({...item, quantity });
      }
      this.saveCartToLocalStorage();
    },

    increaseQuantity(itemId) {
      const item = this.cartItems.find(cartItem => cartItem.id === itemId);
      if (item) {
        item.quantity++;
        this.saveCartToLocalStorage();
      }
    },

    decreaseQuantity(itemId) {
      const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === itemId);
      if (itemIndex!== -1) {
        if (this.cartItems[itemIndex].quantity > 1) {
          this.cartItems[itemIndex].quantity--;
        } else {
          // Remove item if quantity drops to 0 or less
          this.cartItems.splice(itemIndex, 1);
        }
        this.saveCartToLocalStorage();
      }
    },

    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id!== itemId);
      this.saveCartToLocalStorage();
    },

    clearCart() {
      this.cartItems = [];
      this.saveCartToLocalStorage();
    },

    saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
  },
});