<template>
  <div 
    class="rounded-2xl p-6 sm:p-8 shadow-lg transition-colors duration-300"
    :class="heroBackgroundClass"
  >
    <div class="space-y-4">
      <!-- Location -->
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" :class="iconColorClass" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <p class="font-medium" :class="textColorClass">
          {{ displayLocation }}
        </p>
      </div>

      <!-- Status -->
      <div>
        <h1 class="text-3xl sm:text-4xl font-bold mb-2" :class="textColorClass">
          {{ statusTitle }}
        </h1>
        <p class="text-base sm:text-lg opacity-90" :class="textColorClass">
          {{ statusDescription }}
        </p>
      </div>

      <!-- Data Chips -->
      <div v-if="hasLocation && !loading" class="flex flex-wrap gap-2 pt-2">
        <div 
          v-if="weatherData"
          class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
        >
          <p class="text-sm font-medium" :class="textColorClass">
            {{ weatherData }}
          </p>
        </div>
        
        <div 
          v-if="earthquakeData"
          class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
        >
          <p class="text-sm font-medium" :class="textColorClass">
            {{ earthquakeData }}
          </p>
        </div>
        
        <div 
          v-if="riskLevel"
          class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
        >
          <p class="text-sm font-medium" :class="textColorClass">
            Risiko: {{ riskLevel }}
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center gap-2">
        <div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
        <p class="text-sm" :class="textColorClass">Memuat data...</p>
      </div>

      <!-- No Location CTA -->
      <button 
        v-if="!hasLocation && !loading"
        @click="$emit('set-location')"
        class="mt-4 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
      >
        Atur Lokasi Saya
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { getData } from '../components/composables/useSupabase';

const props = defineProps({
  coordinates: {
    type: Object,
    default: null
  },
  locationName: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['set-location']);

const riskStatus = ref('normal');
const weatherData = ref('');
const earthquakeData = ref('');
const riskLevel = ref('');

const hasLocation = computed(() => !!props.coordinates);

const displayLocation = computed(() => {
  if (props.loading) return 'Memuat lokasi...';
  if (!hasLocation.value) return 'Lokasi belum ditentukan';
  return props.locationName || 'Lokasi Anda';
});

const statusTitle = computed(() => {
  if (!hasLocation.value) return 'SIAGA BENCANA';
  
  switch (riskStatus.value) {
    case 'normal':
      return 'KONDISI AMAN';
    case 'waspada':
      return 'WASPADA';
    case 'siaga':
      return 'SIAGA';
    default:
      return 'KONDISI AMAN';
  }
});

const statusDescription = computed(() => {
  if (!hasLocation.value) {
    return 'Atur lokasi Anda untuk mendapatkan informasi risiko real-time';
  }
  
  switch (riskStatus.value) {
    case 'normal':
      return 'Tidak ada ancaman bencana terdeteksi di wilayah Anda';
    case 'waspada':
      return 'Potensi ancaman terdeteksi. Tetap waspada dan pantau perkembangan';
    case 'siaga':
      return 'Ancaman bencana terdeteksi. Bersiap untuk evakuasi';
    default:
      return 'Tidak ada ancaman bencana terdeteksi di wilayah Anda';
  }
});

const heroBackgroundClass = computed(() => {
  switch (riskStatus.value) {
    case 'normal':
      return 'bg-gradient-to-br from-green-500 to-emerald-600';
    case 'waspada':
      return 'bg-gradient-to-br from-yellow-500 to-amber-600';
    case 'siaga':
      return 'bg-gradient-to-br from-orange-500 to-red-600';
    default:
      return 'bg-gradient-to-br from-gray-600 to-gray-700';
  }
});

const textColorClass = computed(() => 'text-white');
const iconColorClass = computed(() => 'text-white');

watch(() => props.coordinates, async (newCoords) => {
  if (newCoords) {
    await fetchRiskData();
  }
}, { immediate: true });

async function fetchRiskData() {
  weatherData.value = 'Cerah, 28°C';
  earthquakeData.value = 'Tidak ada gempa';
  riskLevel.value = 'Rendah';
  riskStatus.value = 'normal';
}
</script>
