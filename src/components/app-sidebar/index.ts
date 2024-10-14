import { defineComponent, ref, watch } from 'vue' // Import watch untuk memantau perubahan route
import { useRouter, useRoute } from 'vue-router' // Import useRoute untuk mendapatkan route saat ini

export default defineComponent({
  name: 'DropdownButton',
  setup() {
    const router = useRouter()
    const route = useRoute() // Mengambil route saat ini
    const isDropdownOpen = ref(false) // Declare isDropdownOpen as a reactive reference
    const activePage = ref(route.path) // Menyimpan halaman aktif

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const navigateTo = (routePath: string) => {
      activePage.value = routePath // Memperbarui halaman aktif
      router.push(routePath)
    }

    // Memperbarui activePage saat route berubah
    watch(route, (newRoute) => {
      activePage.value = newRoute.path
    })

    return {
      isDropdownOpen,
      toggleDropdown,
      navigateTo,
      activePage, // Kembalikan activePage untuk digunakan dalam template
    }
  },
})
