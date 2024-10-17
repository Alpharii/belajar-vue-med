import { defineComponent, ref } from 'vue'
import { useDokterStore } from '@/stores/dokter'

export default defineComponent({
  name: 'Doctor',
  setup() {
    const dokterStore = useDokterStore()

    // Local states
    const modalHandler = ref(false)
    const detailDokter = ref(false)
    const selectedDetailDokter = ref('')
    const isDropdownOpen = ref(false)
    const currentTab = ref('informasiDokter') // Default tab
    const isSpesialisasiDropDownOpen = ref(false)
    const selectedGender = ref('') // Menyimpan pilihan jenis kelamin
    const showFormButton = ref(true)

    // Fungsi toggle dropdown
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const spesialisasiToggleDropdown = () => {
      isSpesialisasiDropDownOpen.value = !isSpesialisasiDropDownOpen.value
    }

    // Fungsi filter dan pagination dari store
    const goToPage = (page: number) => {
      dokterStore.goToPage(page)
    }

    return {
      ...dokterStore, // Mengakses semua properti dari store
      modalHandler,
      detailDokter,
      selectedDetailDokter,
      isDropdownOpen,
      selectedGender,
      showFormButton,
      isSpesialisasiDropDownOpen,
      currentTab,
      toggleDropdown,
      spesialisasiToggleDropdown,
      goToPage, // Memastikan fungsi pagination dipanggil
    }
  },
})
