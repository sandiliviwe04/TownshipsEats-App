<!-- Frontend/src/views/Customer/CartPage.vue -->
<template>
  <div class="cart-page">
    <div class="page-card cart-card">
      <h2 class="text-center mb-20">Your Shopping Cart</h2>

      <div v-if="cartItems.length === 0" class="text-center">
        <p>Your cart is empty. <RouterLink to="/customer/home">Start shopping now!</RouterLink></p>
      </div>

      <div v-else>
        <div class="cart-list">
          <div v-for="item in cartItems" :key="item.id" class="cart-item flex-between">
            <div class="item-details">
              <img :src="item.image" :alt="item.name" class="item-image">
              <div>
                <h3>{{ item.name }}</h3>
                <p class="item-restaurant">{{ item.restaurant }}</p>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item.id)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item.id)">+</button>
                </div>
              </div>
            </div>
            <div class="item-pricing">
              <span class="item-total-price">R{{ (item.price * item.quantity).toFixed(2) }}</span>
              <PrimaryButton text="Remove" type="danger" @click="removeFromCart(item.id)" />
            </div>
          </div>
        </div>

        <div class="cart-summary mt-40">
          <div class="summary-line flex-between">
            <span>Subtotal:</span>
            <span>R{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line flex-between">
            <span>Delivery Fee:</span>
            <span>R{{ deliveryFee.toFixed(2) }}</span>
          </div>
          <div class="summary-line total-line flex-between">
            <span>Total:</span>
            <span>R{{ total.toFixed(2) }}</span>
          </div>
          <PrimaryButton text="Proceed to Checkout" type="success" :fullWidth="true" class="mt-20" @click="checkout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue'; // Import PrimaryButton

const cartItems = ref([
  { id: 1, name: 'Kota Special', restaurant: 'Kasi Flavours', price: 60.00, quantity: 1, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=Kota' },
  { id: 2, name: 'Spicy Chicken Wings (6pc)', restaurant: 'Gourmet Grills', price: 95.00, quantity: 2, image: 'https://via.placeholder.com/50/28a745/ffffff?text=Wings' },
]);

const deliveryFee = ref(25.00);

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const total = computed(() => {
  return subtotal.value + deliveryFee.value;
});

const increaseQuantity = (id) => {
  const item = cartItems.value.find(i => i.id === id);
  if (item) item.quantity++;
};

const decreaseQuantity = (id) => {
  const item = cartItems.value.find(i => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
  } else if (item && item.quantity === 1) {
    removeFromCart(id);
  }
};

const removeFromCart = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id!== id);
  alert('Item removed from cart!');
};

const checkout = () => {
  alert(`Proceeding to checkout for R${total.value.toFixed(2)}`);
  console.log('Initiating checkout...');
  // In a real app, this would navigate to a checkout page or trigger payment process
};
</script>

<style scoped>
/* Keep existing styles */
.cart-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.cart-card {
  max-width: 700px;
  width: 100%;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  padding: 15px;
  align-items: center;
}

.cart-item.item-details {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-grow: 1;
  text-align: left;
}

.cart-item.item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--color-border-light);
}

.cart-item.item-details h3 {
  margin: 0;
  color: var(--color-text-dark);
  font-size: 1.1em;
}

.cart-item.item-restaurant {
  margin: 0;
  font-size: 0.9em;
  color: var(--color-grey-text);
  margin-top: 5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.quantity-controls button {
  background-color: var(--color-border-light);
  color: var(--color-text-dark);
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.quantity-controls button:hover {
  background-color: #ddd;
}

.item-pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.item-total-price {
  font-weight: bold;
  color: var(--color-primary-orange);
  font-size: 1.2em;
}

.cart-summary {
  border-top: 1px solid var(--color-border-light);
  padding-top: 20px;
  margin-top: 30px;
}

.summary-line {
  margin-bottom: 10px;
  font-size: 1.1em;
}

.summary-line span:first-child {
  color: var(--color-grey-text);
}

.summary-line span:last-child {
  font-weight: bold;
  color: var(--color-text-dark);
}

.total-line {
  font-size: 1.3em;
  font-weight: bold;
  color: var(--color-primary-orange);
  border-top: 1px dashed var(--color-border-light);
  padding-top: 15px;
  margin-top: 15px;
}
</style>