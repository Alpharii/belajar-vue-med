<template>
  <ErrorBoundary>
    <layout>
      <RouterView />
    </layout>
  </ErrorBoundary>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import layouts, { LayoutType } from './layouts'
import { shallowRef, watch } from 'vue'
import ErrorBoundary from './components/error-boundary/index.vue'

const layout = shallowRef(layouts['GuestLayout'])
const route = useRoute()

watch(
  () => route.meta.layout,
  (newValue, oldValue) => {
    if (!newValue != oldValue) {
      const layoutName = route.meta.layout as LayoutType
      layout.value = layouts[layoutName]
    }
  },
)
</script>
