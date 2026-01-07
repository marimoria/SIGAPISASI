<template>
  <button
    @click="handleClick"
    class="relative bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 text-left border-2"
    :class="[
      disabled ? 'border-gray-200 opacity-60 cursor-not-allowed' : 'border-transparent hover:border-red-100',
      !disabled && 'hover:-translate-y-0.5'
    ]"
    :disabled="disabled"
  >
    <!-- Lock Badge -->
    <div 
      v-if="locked" 
      class="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
    >
      <svg class="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
      </svg>
    </div>

    <!-- Icon -->
    <div 
      class="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
      :class="iconBgClass"
    >
      <component :is="iconComponent" class="w-6 h-6" :class="iconColorClass" />
    </div>

    <!-- Title -->
    <h3 class="font-semibold text-gray-900 text-sm sm:text-base mb-2">
      {{ title }}
    </h3>

    <!-- Status -->
    <p class="text-xs sm:text-sm text-gray-600 mb-3">
      {{ status }}
    </p>

    <!-- Progress Bar -->
    <div v-if="progress !== null && !locked" class="w-full bg-gray-200 rounded-full h-2">
      <div 
        class="bg-linear-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </button>
</template>

<script setup>
import { computed, h } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: null
  },
  locked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const iconComponent = computed(() => {
  const icons = {
    bag: BagIcon,
    document: DocumentIcon,
    medical: MedicalIcon,
    route: RouteIcon
  };
  return icons[props.icon] || BagIcon;
});

const iconBgClass = computed(() => {
  if (props.locked || props.disabled) return 'bg-gray-100';
  return 'bg-red-50';
});

const iconColorClass = computed(() => {
  if (props.locked || props.disabled) return 'text-gray-400';
  return 'text-red-600';
});

function handleClick() {
  if (!props.disabled && !props.locked) {
    emit('click');
  }
}

function BagIcon() {
  return h('svg', {
    fill: 'currentColor',
    viewBox: '0 0 20 20'
  }, [
    h('path', {
      d: 'M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
    })
  ]);
}

function DocumentIcon() {
  return h('svg', {
    fill: 'currentColor',
    viewBox: '0 0 20 20'
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      d: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z',
      'clip-rule': 'evenodd'
    })
  ]);
}

function MedicalIcon() {
  return h('svg', {
    fill: 'currentColor',
    viewBox: '0 0 20 20'
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z',
      'clip-rule': 'evenodd'
    })
  ]);
}

function RouteIcon() {
  return h('svg', {
    fill: 'currentColor',
    viewBox: '0 0 20 20'
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      d: 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z',
      'clip-rule': 'evenodd'
    })
  ]);
}
</script>
