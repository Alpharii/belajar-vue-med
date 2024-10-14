<template>
  <div class="flex flex-col">
    <AppHeader />
    <div class="flex">
      <AppSidebar />
      <main class="w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/app-sidebar/index.vue'
import AppHeader from '@/components/app-header/index.vue'
</script>
