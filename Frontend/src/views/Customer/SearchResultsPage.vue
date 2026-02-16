<!-- Frontend/src/views/Customer/SearchResultsPage.vue -->
<template>
  <div class="search-results-page">
    <div class="page-card search-card">
      <h2 class="text-center mb-20">Search Results</h2>

      <div class="search-input-container mb-20">
        <input type="text" v-model="searchTerm" placeholder="Search for dishes or restaurants..." @keyup.enter="performSearch">
        <PrimaryButton text="Search" type="primary" @click="performSearch" />
      </div>

      <p class="text-center mb-20" v-if="results.length === 0 && searched">No results found for "{{ lastSearchTerm }}".</p>
      <p class="text-center mb-20" v-else-if="!searched">Start by searching for something delicious!</p>

      <div class="results-list" v-else>
        <div v-for="item in results" :key="item.id" class="result-item flex-between">
          <div class="item-info">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div>
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.type }} - {{ item.restaurant }}</p>
              <span class="item-rating">{{ item.rating }} <i class="star-icon">★</i></span>
            </div>
          </div>
          <div class="item-actions">
            <span class="item-price">R{{ item.price.toFixed(2) }}</span>
            <PrimaryButton text="Add to Cart" type="primary" @click="addToCart(item.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue'; // Import PrimaryButton

const searchTerm = ref('');
const lastSearchTerm = ref('');
const results = ref([]);
const searched = ref(false);

// Dummy data for simulation
const allDishes = [
  { id: 1, name: 'Kota Special', type: 'Traditional', restaurant: 'Kasi Flavours', price: 60.00, rating: 4.5, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=D1' },
  { id: 2, name: 'Flame Grilled Chicken', type: 'Grilled', restaurant: 'Nando\'s', price: 90.00, rating: 4.8, image: 'https://via.placeholder.com/50/28a745/ffffff?text=D2' },
  { id: 3, name: 'Vegetable Curry', type: 'Vegetarian', restaurant: 'Spice Route', price: 85.00, rating: 4.2, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=D3' },
  { id: 4, name: 'Boerewors Roll', type: 'Street Food', restaurant: 'Corner Cafe', price: 40.00, rating: 4.0, image: 'https://via.placeholder.com/50/28a745/ffffff?text=D4' },
  { id: 5, name: 'Malva Pudding', type: 'Dessert', restaurant: 'Sweet Temptations', price: 45.00, rating: 4.7, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=D5' },
];

const performSearch = () => {
  lastSearchTerm.value = searchTerm.value;
  searched.value = true;
  if (!searchTerm.value) {
    results.value = [];
    return;
  }
  const query = searchTerm.value.toLowerCase();
  results.value = allDishes.filter(dish =>
    dish.name.toLowerCase().includes(query) ||
    dish.restaurant.toLowerCase().includes(query) ||
    dish.type.toLowerCase().includes(query)
  );
};

const addToCart = (itemId) => {
  console.log(`Item ${itemId} added to cart!`);
  alert('Item added to cart!');
  // In a real app, you would dispatch an action to add to a global cart state
};
</script>

<style scoped>
/* Keep existing styles */
.search-results-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.search-card {
  max-width: 800px;
}

.search-input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.search-input-container input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid var(--color-border-light);
  border-radius: 5px;
  font-size: 1em;
}

.results-list {
  margin-top: 20px;
}

.result-item {
  background-color: var(--color-background-light);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
}

.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid var(--color-border-light);
}

.item-info h3 {
  margin: 0;
  color: var(--color-text-dark);
}

.item-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--color-grey-text);
}

.item-rating {
  font-size: 0.9em;
  color: var(--color-primary-orange);
  font-weight: bold;
}

.star-icon {
  font-size: 1em;
  line-height: 1;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-price {
  font-weight: bold;
  color: var(--color-primary-orange);
  font-size: 1.1em;
}
</style>