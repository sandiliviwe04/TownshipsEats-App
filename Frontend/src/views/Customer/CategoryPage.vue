<!-- Frontend/src/views/Customer/CategoryPage.vue -->
<template>
  <div class="category-page">
    <div class="page-card category-card">
      <h2 class="text-center">Explore Categories</h2>
      <p class="text-center mb-20">Find your next delicious meal by browsing our curated categories.</p>

      <div class="category-grid">
        <div v-for="category in categories" :key="category.id" class="category-item">
          <img :src="category.image" :alt="category.name" class="category-image">
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
          <PrimaryButton text="View Dishes" @click="viewCategory(category.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const router = useRouter(); // Initialize router

const categories = ref([
  { id: 1, name: 'Burgers', description: 'Classic and gourmet burgers.', image: 'https://via.placeholder.com/150/ff7f00/ffffff?text=Burgers' },
  { id: 2, name: 'Pizza', description: 'Freshly baked pizzas.', image: 'https://via.placeholder.com/150/28a745/ffffff?text=Pizza' },
  { id: 3, name: 'Traditional', description: 'Local and authentic dishes.', image: 'https://via.placeholder.com/150/ff7f00/ffffff?text=Traditional' },
  { id: 4, name: 'Desserts', description: 'Sweet treats for everyone.', image: 'https://via.placeholder.com/150/28a745/ffffff?text=Desserts' },
  { id: 5, name: 'Drinks', description: 'Refreshing beverages.', image: 'https://via.placeholder.com/150/ff7f00/ffffff?text=Drinks' },
  { id: 6, name: 'Vegetarian', description: 'Healthy and delicious vegetarian options.', image: 'https://via.placeholder.com/150/28a745/ffffff?text=Veg' },
]);

const viewCategory = (categoryId) => {
  router.push({ name: 'CategoryDishes', params: { id: categoryId } }); // Navigate to the new page
};
</script>

<style scoped>
/* (No changes to existing styles) */
.category-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.category-card {
  max-width: 1000px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.category-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.category-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid var(--color-primary-orange);
}

.category-item h3 {
  color: var(--color-text-dark);
  margin-bottom: 10px;
}

.category-item p {
  color: var(--color-grey-text);
  font-size: 0.9em;
  margin-bottom: 15px;
}
</style>