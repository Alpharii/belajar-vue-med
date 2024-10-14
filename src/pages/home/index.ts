import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const goToProfile = () => {
      router.push('/profile')
    }

    return {
      goToProfile,
    }
  },
})
