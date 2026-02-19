<!-- Frontend/src/views/Customer/VendorDetailPage.vue -->
<template>
  <div class="vendor-detail-page">
    <div class="page-card vendor-detail-card">
      <BackButton class="mb-20">Back to Home</BackButton>
      
      <div v-if="vendor">
        <h2 class="text-center mb-10">{{ vendor.name }}</h2>
        <p class="text-center vendor-cuisine mb-20">{{ vendor.cuisine }}</p>

        <img :src="vendor.bannerImage" :alt="vendor.name" class="vendor-banner">

        <h3 class="mt-40 mb-20">Menu</h3>
        <div class="menu-list">
          <MealCard v-for="item in vendor.menu" :key="item.id" :meal="item" @add-to-cart="handleAddToCart" />
        </div>
      </div>
      <div v-else class="text-center">
        <p>Loading vendor details...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from '../../components/Shared/BackButton.vue'; // Import BackButton
import MealCard from '../../components/Customer/MealCard.vue'; // Import MealCard

const route = useRoute();
const vendor = ref(null);

const dummyVendors = [
  {
    id: 1,
    name: 'Kasi Flavours',
    cuisine: 'Traditional SA',
    bannerImage: 'https://loremflickr.com/800/200/food,african,table?lock=201',
    menu: [
      { id: 101, name: 'Kota Special', description: 'Classic Kota with all the trimmings.', price: 60.00, image: 'https://loremflickr.com/90/90/sandwich,sub?lock=301' },
      { id: 102, name: 'Mogodu & Pap', description: 'Traditional tripe and pap.', price: 75.00, image: 'https://loremflickr.com/90/90/porridge,stew?lock=302' },
      { id: 103, name: 'Skop', description: 'Grilled lamb head, a local delicacy.', price: 90.00, image: 'https://loremflickr.com/90/90/meat,roasted?lock=303' },
    ],
  },
  {
    id: 2,
    name: 'Vusi\'s Shisanyama',
    cuisine: 'Braai & Meat',
    bannerImage: 'https://loremflickr.com/800/200/barbecue,fire,night?lock=202',
    menu: [
      { id: 201, name: 'Mixed Grill Platter', description: 'Wors, chops, and brisket for 2.', price: 250.00, image: 'https://loremflickr.com/90/90/barbecue,steak?lock=304' },
      { id: 202, name: 'Quarter Chicken & Chips', description: 'Flame grilled chicken leg.', price: 65.00, image: 'https://loremflickr.com/90/90/chicken,fries?lock=305' },
      { id: 203, name: 'Steak & Pap', description: 'Tender steak served with gravy and pap.', price: 120.00, image: 'https://loremflickr.com/90/90/steak,dinner?lock=306' },
    ],
  },
  {
    id: 3,
    name: 'Gourmet Grills',
    cuisine: 'Burgers & BBQ',
    bannerImage: 'https://loremflickr.com/800/200/burger,restaurant?lock=203',
    menu: [
      { id: 301, name: 'Cheese Burger', description: 'Juicy patty with cheddar.', price: 85.00, image: 'https://loremflickr.com/90/90/burger,cheese?lock=307' },
      { id: 302, name: 'Ribs Platter', description: 'Tender BBQ ribs with fries.', price: 150.00, image: 'https://loremflickr.com/90/90/ribs,bbq?lock=308' },
      { id: 303, name: 'Loaded Fries', description: 'Fries topped with bacon and cheese.', price: 55.00, image: 'https://loremflickr.com/90/90/fries,cheese?lock=309' },
    ],
  },
  {
    id: 4,
    name: 'Mama Nandi\'s Kitchen',
    cuisine: 'Home Cooked',
    bannerImage: 'https://loremflickr.com/800/200/stew,pot,cooking?lock=204',
    menu: [
      { id: 401, name: 'Hardbody Chicken', description: 'Slow cooked marathon chicken.', price: 85.00, image: 'https://loremflickr.com/90/90/chicken,stew?lock=310' },
      { id: 402, name: 'Dombolo & Stew', description: 'Beef stew with steamed dumplings.', price: 80.00, image: 'https://loremflickr.com/90/90/dumplings,stew?lock=311' },
      { id: 403, name: 'Samp & Beans', description: 'Creamy samp and beans.', price: 50.00, image: 'https://loremflickr.com/90/90/beans,corn?lock=312' },
    ],
  },
  {
    id: 5,
    name: 'Kasi King Kotas',
    cuisine: 'Street Food',
    bannerImage: 'https://loremflickr.com/800/200/streetfood,market?lock=205',
    menu: [
      { id: 501, name: 'The Boss Kota', description: 'Polony, viennas, russian, cheese, egg.', price: 95.00, image: 'https://loremflickr.com/90/90/sandwich,huge?lock=313' },
      { id: 502, name: 'Student Kota', description: 'Chips, polony and atchar.', price: 35.00, image: 'https://loremflickr.com/90/90/sandwich,chips?lock=314' },
      { id: 503, name: 'Russian & Chips', description: 'Fried russian sausage with chips.', price: 45.00, image: 'https://loremflickr.com/90/90/hotdog,fries?lock=315' },
    ],
  },
  {
    id: 6,
    name: 'Pizza Zone',
    cuisine: 'Italian',
    bannerImage: 'https://loremflickr.com/800/200/pizza,italian?lock=206',
    menu: [
      { id: 601, name: 'Meaty Supreme', description: 'Ham, bacon, pepperoni, chicken.', price: 130.00, image: 'https://loremflickr.com/90/90/pizza,meat?lock=316' },
      { id: 602, name: 'Hawaiian', description: 'Ham and pineapple.', price: 100.00, image: 'https://loremflickr.com/90/90/pizza,pineapple?lock=317' },
    ],
  },
];

onMounted(() => {
  const vendorId = parseInt(route.params.id);
  vendor.value = dummyVendors.find(v => v.id === vendorId);
});

const handleAddToCart = (item) => {
  alert(`Added ${item.name} to cart!`);
  console.log('Add to cart:', item);
};
</script>

<style scoped>
.vendor-detail-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  padding: 20px;
}

.vendor-detail-card {
  max-width: 900px;
  width: 100%;
  text-align: left;
}

.mb-20 {
  margin-bottom: 20px;
}

.vendor-cuisine {
  color: var(--color-grey-text);
  font-style: italic;
}

.vendor-banner {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>