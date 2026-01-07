<template>
  <div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold text-gray-900">Kesiapan Anda</h2>
      <p class="text-gray-600 mt-1">Pastikan perlengkapan darurat Anda siap</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <PreparationCard
        title="Tas Siaga Darurat"
        icon="bag"
        :status="bagStatus"
        :progress="bagProgress"
        :locked="!userLogged"
        @click="navigate('/siaga/tas-siaga')"
      />

      <PreparationCard
        title="Dokumen Penting"
        icon="document"
        :status="documentStatus"
        :locked="!userLogged"
        @click="navigate('/siaga/dokumen')"
      />

      <PreparationCard
        title="Perlengkapan P3K"
        icon="medical"
        :status="medicalStatus"
        :locked="!userLogged"
        @click="navigate('/siaga/p3k')"
      />

      <PreparationCard
        title="Rute Evakuasi"
        icon="route"
        :status="routeStatus"
        :locked="!hasLocation"
        :disabled="!hasLocation"
        @click="navigate('/siaga/rute-evakuasi')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getData } from '../components/composables/useSupabase';
import { user } from '../components/composables/useAuth';
import PreparationCard from './PreparationCard.vue';

const props = defineProps({
  userLogged: {
    type: Boolean,
    required: true
  },
  hasLocation: {
    type: Boolean,
    required: true
  }
});

const router = useRouter();

const bagProgress = ref(0);
const bagStatus = computed(() => {
  if (!props.userLogged) return 'Masuk untuk melacak';
  if (bagProgress.value === 0) return 'Belum ada data';
  return `${Math.round(bagProgress.value)}% siap`;
});

const documentStatus = computed(() => {
  if (!props.userLogged) return 'Masuk untuk melacak';
  return 'Belum lengkap';
});

const medicalStatus = computed(() => {
  if (!props.userLogged) return 'Masuk untuk melacak';
  return 'Belum lengkap';
});

const routeStatus = computed(() => {
  if (!props.hasLocation) return 'Atur lokasi terlebih dahulu';
  return 'Belum diatur';
});

onMounted(async () => {
  if (props.userLogged) {
    await fetchPreparationData();
  }
});

async function fetchPreparationData() {
  if (!user.value) return;

  const { data, error } = await getData('user_bag_progress', {
    user_id: user.value.id
  });

  if (!error && data && data.length > 0) {
    const totalProgress = data.reduce((sum, item) => sum + (item.completion_percent || 0), 0);
    bagProgress.value = totalProgress / data.length;
  }
}

function navigate(path) {
  router.push(path);
}
</script>
