<template>
  <div class="">
    <h1 class="text-danger">Welcome to Home Page</h1>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { user } from "../components/composables/useAuth";
  import { useRouter } from "vue-router";

  const router = useRouter();

  // if user.value is null -> !! -> false
  const userLogged = computed(() => !!user.value);
</script>