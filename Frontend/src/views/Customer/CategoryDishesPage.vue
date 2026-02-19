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
    name: 'Shisanyama', 
    description: 'Authentic braai meat and sides.', 
    dishes: [
      { id: 201, name: 'Mixed Grill Platter', description: 'Wors, chops, and brisket for 2.', price: 250.00, image: 'https://loremflickr.com/90/90/barbecue,steak?lock=304' },
      { id: 203, name: 'Steak & Pap', description: 'Tender steak served with gravy and pap.', price: 120.00, image: 'https://loremflickr.com/90/90/steak,dinner?lock=306' },
      { id: 204, name: 'Wors Roll', description: 'Boerewors in a fresh roll with relish.', price: 50.00, image: 'https://loremflickr.com/90/90/hotdog,sausage?lock=318' },
    ]
  },
  { 
    id: 2, 
    name: 'Kotas', 
    description: 'The legendary township bunny chow.', 
    dishes: [
      { id: 101, name: 'Kota Special', description: 'Classic Kota with all the trimmings.', price: 60.00, image: 'https://loremflickr.com/90/90/sandwich,sub?lock=301' },
      { id: 501, name: 'The Boss Kota', description: 'Polony, viennas, russian, cheese, egg.', price: 95.00, image: 'https://loremflickr.com/90/90/sandwich,huge?lock=313' },
      { id: 502, name: 'Student Kota', description: 'Chips, polony and atchar.', price: 35.00, image: 'https://loremflickr.com/90/90/sandwich,chips?lock=314' },
    ]
  },
  { 
    id: 3, 
    name: 'Mogodu', 
    description: 'Tripe, trotters, and hardbody chicken.', 
    dishes: [
      { id: 102, name: 'Mogodu & Pap', description: 'Traditional tripe stew served with pap.', price: 75.00, image: 'https://loremflickr.com/90/90/porridge,stew?lock=302' },
      { id: 103, name: 'Skop', description: 'Grilled lamb head.', price: 90.00, image: 'https://loremflickr.com/90/90/meat,roasted?lock=303' },
      { id: 403, name: 'Samp & Beans', description: 'Creamy samp and beans.', price: 50.00, image: 'https://loremflickr.com/90/90/beans,corn?lock=312' },
    ]
  },
  { 
    id: 4, 
    name: 'Street Food', 
    description: 'Magwinya, Achaar, and quick bites.', 
    dishes: [
      { id: 503, name: 'Russian & Chips', description: 'Fried russian sausage with chips.', price: 45.00, image: 'https://loremflickr.com/90/90/hotdog,fries?lock=315' },
      { id: 404, name: 'Magwinya Platter', description: '6 Fresh fat cakes.', price: 30.00, image: 'https://loremflickr.com/90/90/doughnut,fried?lock=319' },
    ]
  },
  { 
    id: 5, 
    name: 'Burgers', 
    description: 'Juicy gourmet and classic burgers.', 
    dishes: [
      { id: 301, name: 'Cheese Burger', description: 'Juicy beef patty with cheddar cheese.', price: 85.00, image: 'https://loremflickr.com/90/90/burger,cheese?lock=307' },
      { id: 102, name: 'Chicken Burger', description: 'Crispy chicken fillet with fresh lettuce.', price: 75.00, image: 'https://loremflickr.com/90/90/chicken,burger?lock=320' },
    ]
  },
  { 
    id: 6, 
    name: 'Pizza', 
    description: 'Freshly baked, hot and cheesy pizzas.', 
    dishes: [
      { id: 601, name: 'Meaty Supreme', description: 'Ham, bacon, pepperoni, chicken.', price: 130.00, image: 'https://loremflickr.com/90/90/pizza,meat?lock=316' },
      { id: 602, name: 'Hawaiian', description: 'Ham and pineapple.', price: 100.00, image: 'https://loremflickr.com/90/90/pizza,pineapple?lock=317' },
    ]
  },
  { 
    id: 7, 
    name: 'Chicken', 
    description: 'Fried, grilled, or stewed chicken.', 
    dishes: [
      { id: 202, name: 'Quarter Chicken & Chips', description: 'Flame grilled chicken leg.', price: 65.00, image: 'https://loremflickr.com/90/90/chicken,fries?lock=305' },
      { id: 401, name: 'Hardbody Chicken', description: 'Slow cooked marathon chicken.', price: 85.00, image: 'https://loremflickr.com/90/90/chicken,stew?lock=310' },
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
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
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