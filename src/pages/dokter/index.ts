import { defineComponent, ref } from 'vue'
import { useDokterStore } from '@/stores/dokter'

export default defineComponent({
  name: 'Doctor',
  setup() {
    const dokterStore = useDokterStore()

    // Local states
    const modalHandler = ref(false)
    const dropdownOpen = ref(false)
    const detailDokter = ref(false)
    const selectedDetailDokter = ref('')
    const isDropdownOpen = ref(false)
    const currentTab = ref('informasiDokter') // Default tab
    const isSpesialisasiDropDownOpen = ref(false)
    const selectedGender = ref('') // Menyimpan pilihan jenis kelamin
    const showFormButton = ref(true)
    const currentStatus = ref('AKTIF') // Default status dokter
    const options = [
      { label: 'Aktif', value: 'aktif' },
      { label: 'Non Aktif', value: 'nonaktif' },
      { label: 'Hapus Dokter', value: 'delete' },
    ]

    // Fungsi toggle dropdown status
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }
    const spesialisasiToggleDropdown = () => {
      isSpesialisasiDropDownOpen.value = !isSpesialisasiDropDownOpen.value
    }

    // Fungsi filter dan pagination dari store

    return {
      ...dokterStore, // Mengakses semua properti dari store
      modalHandler,
      options,
      detailDokter,
      selectedDetailDokter,
      dropdownOpen,
      isDropdownOpen,
      currentStatus,
      selectedGender,
      showFormButton,
      isSpesialisasiDropDownOpen,
      currentTab,
      toggleDropdown,
      spesialisasiToggleDropdown,
    }
  },
})
