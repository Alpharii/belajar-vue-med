import { defineComponent } from 'vue'
import Toast from 'primevue/toast'

export default defineComponent({
  components: { Toast },
  setup: () => ({}),
  errorCaptured(err) {
    const error = err as Error
    if (import.meta.env.DEV) {
      if (error.stack) {
        console.error(error.stack)
      }
    }

    this.$toast.add({
      summary: `${this.$t('general.error.summary')}`,
      detail: `${this.$t('general.error.detail')}`,
      closable: true,
      severity: 'error',
      life: 5000,
    })
  },
})
