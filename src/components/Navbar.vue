<template>
  <header class="sticky top-0 z-50 bg-(--color-surface) shadow-sm">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-700 to-blue-800">
              <span class="text-xl font-bold text-(--color-text-inverse)">S</span>
            </div>
            <span class="text-xl font-bold text-text-main">SIGAPISASI</span>
          </router-link>
        </div>


        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/' }"
          >
            Beranda
          </router-link>
          <router-link 
            to="/pantau" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/pantau' }"
          >
            Pantau
          </router-link>
          <router-link 
            to="/siaga" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/siaga' }"
          >
            Siaga
          </router-link>
          <router-link 
            to="/cerdas" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/cerdas' }"
          >
            Cerdas
          </router-link>
        </div>


        <!-- Right Side - Auth -->
        <div class="flex items-center space-x-4">
          <!-- Guest State -->
          <router-link 
            v-if="!userLogged" 
            to="/login"
            class="hidden md:inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white! hover:bg-blue-800 transition-colors"
          >
            Masuk
          </router-link>


          <!-- Logged In State -->
          <div v-else class="hidden md:flex items-center space-x-3">
            <button 
              @click="toggleDropdown"
              class="flex items-center space-x-2 rounded-full bg-background px-3 py-2 hover:bg-border transition-colors"
            >
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-(--color-text-inverse)">
                {{ userInitials }}
              </div>
              <svg 
                class="h-4 w-4 text-text-muted transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>


            <!-- User Dropdown -->
            <transition name="dropdown">
              <div 
                v-if="isDropdownOpen"
                class="absolute right-4 top-16 mt-2 w-48 rounded-lg bg-(--color-surface) shadow-lg ring-1 ring-border"
              >
                <div class="py-1">
                  <router-link 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-text-main hover:bg-background"
                    @click="isDropdownOpen = false"
                  >
                    Profil
                  </router-link>
                  <button 
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-background"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </transition>
          </div>


          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-text-muted hover:bg-background"
          >
            <svg 
              class="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="!isMobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>


      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div 
          v-if="isMobileMenuOpen"
          class="md:hidden border-t border-border"
        >
          <div class="space-y-1 px-2 pb-3 pt-2">
            <router-link 
              to="/" 
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link-active': $route.path === '/' }"
              @click="isMobileMenuOpen = false"
            >
              Beranda
            </router-link>
            <router-link 
              to="/pantau" 
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link-active': $route.path === '/pantau' }"
              @click="isMobileMenuOpen = false"
            >
              Pantau
            </router-link>
            <router-link 
              to="/siaga" 
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link-active': $route.path === '/siaga' }"
              @click="isMobileMenuOpen = false"
            >
              Siaga
            </router-link>
            <router-link 
              to="/cerdas" 
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link-active': $route.path === '/cerdas' }"
              @click="isMobileMenuOpen = false"
            >
              Cerdas
            </router-link>


            <!-- Mobile Auth Section -->
            <div class="border-t border-border pt-4 mt-4">
              <router-link 
                v-if="!userLogged"
                to="/login"
                class="block rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white!"
                @click="isMobileMenuOpen = false"
              >
                Masuk
              </router-link>


              <div v-else class="space-y-2">
                <div class="flex items-center space-x-3 px-3 py-2">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-(--color-text-inverse)">
                    {{ userInitials }}
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-text-main">{{ profile?.username || 'User' }}</p>
                    <p class="text-xs text-text-muted">{{ user?.email }}</p>
                  </div>
                </div>
                <router-link 
                  to="/profile"
                  class="mobile-nav-link"
                  @click="isMobileMenuOpen = false"
                >
                  Profil
                </router-link>
                <button 
                  @click="handleLogout"
                  class="w-full text-left mobile-nav-link text-danger"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>


<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { user, profile, handleLogout as authLogout } from './composables/useAuth';


  const router = useRouter();
  const isMobileMenuOpen = ref(false);
  const isDropdownOpen = ref(false);


  const userLogged = computed(() => !!user.value);


  const userInitials = computed(() => {
    if (!profile.value?.username) return 'U';
    return profile.value.username.charAt(0).toUpperCase();
  });


  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    isDropdownOpen.value = false;
  }


  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
  }


  async function handleLogout() {
    const { success } = await authLogout();
    if (success) {
      isDropdownOpen.value = false;
      isMobileMenuOpen.value = false;
      router.push('/');
    }
  }
</script>


<style scoped>
  @reference "tailwindcss";
  .nav-link {
    @apply text-sm font-medium transition-colors;
    color: var(--color-text-muted);
  }

  .nav-link:hover {
    color: var(--color-blue-700);
  }


  .nav-link-active {
    @apply font-semibold;
    color: var(--color-blue-700);
  }


  .mobile-nav-link {
    @apply block rounded-lg px-3 py-2 text-base font-medium transition-colors;
    color: var(--color-text-main);
  }

  .mobile-nav-link:hover {
    background-color: var(--color-background);
    color: var(--color-blue-700);
  }


  .mobile-nav-link-active {
    @apply font-semibold;
    background-color: var(--color-background);
    color: var(--color-blue-700);
  }


  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease;
  }


  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }


  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.3s ease;
  }


  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
