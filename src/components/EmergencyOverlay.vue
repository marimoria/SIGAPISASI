<template>
  <transition name="emergency">
    <div 
      v-if="isActive" 
      class="fixed inset-0 z-100 bg-red-600 flex items-center justify-center p-4"
    >
      <div class="max-w-2xl w-full text-center space-y-6">
        <!-- Alert Icon -->
        <div class="flex justify-center">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse">
            <svg class="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl sm:text-5xl font-bold text-white">
          PERINGATAN DARURAT
        </h1>

        <!-- Message -->
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <p class="text-xl sm:text-2xl text-white font-semibold mb-4">
            {{ emergencyMessage }}
          </p>
          <p class="text-base sm:text-lg text-white/90">
            {{ emergencyInstructions }}
          </p>
        </div>

        <!-- Action Button -->
        <button 
          @click="acknowledgeEmergency"
          class="w-full sm:w-auto px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors"
        >
          SAYA MENGERTI
        </button>

        <!-- Timestamp -->
        <p class="text-sm text-white/70">
          Diterima pada: {{ formattedTimestamp }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';

const isActive = ref(false);
const emergencyMessage = ref('');
const emergencyInstructions = ref('');
const emergencyTimestamp = ref(null);

const formattedTimestamp = computed(() => {
  if (!emergencyTimestamp.value) return '';
  
  const date = new Date(emergencyTimestamp.value);
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

onMounted(() => {
  subscribeToEmergencies();
});

function subscribeToEmergencies() {
  const channel = supabase
    .channel('emergency-alerts')
    .on('broadcast', { event: 'emergency' }, (payload) => {
      showEmergency(payload);
    })
    .subscribe();
}

function showEmergency(data) {
  emergencyMessage.value = data.message || 'Terjadi kondisi darurat di wilayah Anda';
  emergencyInstructions.value = data.instructions || 'Segera ikuti prosedur evakuasi yang telah ditetapkan';
  emergencyTimestamp.value = data.timestamp || new Date().toISOString();
  isActive.value = true;
}

function acknowledgeEmergency() {
  isActive.value = false;
}
</script>

<style scoped>
.emergency-enter-active {
  animation: emergency-appear 0.5s ease-out;
}

.emergency-leave-active {
  animation: emergency-appear 0.3s ease-in reverse;
}

@keyframes emergency-appear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
