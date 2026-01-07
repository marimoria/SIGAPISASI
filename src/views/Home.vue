<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <!-- Risk Status Hero -->
      <RiskStatusHero 
        :coordinates="userLocation" 
        :location-name="locationName"
        :loading="locationLoading"
      />

      <!-- Preparation Cards Grid -->
      <PreparationGrid :user-logged="userLogged" :has-location="hasLocation" />
    </div>

    <!-- Emergency Overlay -->
    <EmergencyOverlay />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { user } from '../components/composables/useAuth';
import RiskStatusHero from '../components/RiskStatusHero.vue';
import PreparationGrid from '../components/PreparationGrid.vue';
import EmergencyOverlay from '../components/EmergencyOverlay.vue';
import Navbar from '@/components/Navbar.vue';

const userLocation = ref(null);
const locationName = ref('');
const locationLoading = ref(false);

const userLogged = computed(() => !!user.value);
const hasLocation = computed(() => !!userLocation.value);

onMounted(async () => {
  await fetchUserLocation();
});

async function fetchUserLocation() {
  locationLoading.value = true;
  
  try {
    if (userLogged.value) {
      const storedLocation = localStorage.getItem('user_location');
      if (storedLocation) {
        const parsed = JSON.parse(storedLocation);
        userLocation.value = parsed.coordinates;
        locationName.value = parsed.name;
      }
    }
  } catch (error) {
    console.error('Location fetch error:', error);
  } finally {
    locationLoading.value = false;
  }
}
</script>
