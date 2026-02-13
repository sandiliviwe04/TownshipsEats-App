<!-- Frontend/src/views/Customer/CategoryDishesPage.vue -->
<template>
  <div class="category-dishes-page">
    <div class="page-card category-dishes-card">
      <BackButton class="mb-20">Back to Categories</BackButton>

      <div v-if="category">
        <h2 class="text-center mb-10">{{ category.name }} Dishes</h2>
        <p class="text-center category-description mb-20">{{ category.description }}</p>
        
        <div class="dishes-list">
          <MealCard v-for="dish in category.dishes" :key="dish.id" :meal="dish" @add-to-cart="handleAddToCart" />
        </div>
      </div>
      <div v-else class="text-center">
        <p>Category not found or loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from '../../components/Shared/BackButton.vue';
import MealCard from '../../components/Customer/MealCard.vue';

const route = useRoute();
const category = ref(null);

// Dummy data for categories and their dishes
const dummyCategories = [
  { 
    id: 1, 
    name: 'Burgers', 
    description: 'Classic and gourmet burgers from your favorite spots.', 
    dishes: [
      { id: 101, name: 'Cheese Burger', description: 'Juicy beef patty with cheddar cheese.', price: 85.00, image: 'https://via.placeholder.com/90/ff7f00/ffffff?text=Burger' },
      { id: 102, name: 'Chicken Burger', description: 'Crispy chicken fillet with fresh lettuce.', price: 75.00, image: 'https://via.placeholder.com/90/28a745/ffffff?text=ChickenB' },
      { id: 103, name: 'Veggie Burger', description: 'Plant-based patty, healthy and delicious.', price: 70.00, image: 'https://via.placeholder.com/90/ff7f00/ffffff?text=VeggieB' },
    ]
  },
  { 
    id: 2, 
    name: 'Pizza', 
    description: 'Freshly baked, hot and cheesy pizzas.', 
    dishes: [
      { id: 201, name: 'Margherita Pizza', description: 'Classic tomato and mozzarella.', price: 90.00, image: 'https://via.placeholder.com/90/28a745/ffffff?text=Pizza' },
      { id: 202, name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni slices.', price: 110.00, image: 'https://via.placeholder.com/90/ff7f00/ffffff?text=Pepperoni' },
    ]
  },
  { 
    id: 3, 
    name: 'Traditional', 
    description: 'Local and authentic South African dishes.', 
    dishes: [
      { id: 301, name: 'Kota Special', description: 'Hearty quarter loaf with polony, atchar, cheese and chips.', price: 60.00, image: 'https://via.placeholder.com/90/ff7f00/ffffff?text=Kota' },
      { id: 302, name: 'Mogodu & Pap', description: 'Traditional tripe stew served with pap.', price: 75.00, image: 'https://via.placeholder.com/90/28a745/ffffff?text=Mogodu' },
    ]
  },
];

onMounted(() => {
  const categoryId = parseInt(route.params.id);
  category.value = dummyCategories.find(c => c.id === categoryId);
});

const handleAddToCart = (dish) => {
  alert(`Added ${dish.name} to cart!`);
  console.log('Add to cart:', dish);
};
</script>

<style scoped>
.category-dishes-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.category-dishes-card {
  max-width: 900px;
  width: 100%;
  text-align: left;
}

.category-description {
  color: var(--color-grey-text);
  font-style: italic;
}

.dishes-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
</style>