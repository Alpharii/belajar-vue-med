import { defineComponent, onMounted, ref, computed } from 'vue'
import axios from 'axios'
import dokter from './dataDummy'

// const apiURL = 'http://localhost:3000/dokter'

// Definisikan tipe Dokter
interface Dokter {
  id: number
  nama: string
  provider: string
  spesialis: string
  tanggalDibuat: string
  status: string
}

export default defineComponent({
  name: 'Doctor',
  setup() {
    const showFormButton = ref(true)
    const currentPage = ref(1)
    const rowsPerPage = 8
    const dokters = ref<Dokter[]>(dokter)
    const searchQuery = ref('')
    const selectedProvider = ref('')
    const selectedSpesialis = ref('')
    const selectedStatus = ref('')
    const selectedDate = ref('')
    const currentTab = ref('informasiDokter') // Default tab
    const selectedGender = ref('') // Menyimpan pilihan jenis kelamin
    const isDropdownOpen = ref(false) // Menyimpan status dropdown
    const isSpesialisasiDropDownOpen = ref(false)
    const selectedSpesialisasi = ref(null)
    const modalHandler = ref(false)

    // State untuk menambah dokter
    const showForm = ref(true)
    const nama = ref('')
    const provider = ref('')
    const spesialis = ref('')
    const tanggalDibuat = ref('')
    const status = ref('Aktif')
    const nextId = ref(dokters.value.length + 1)

    // Sample data for providers, spesialisasi, and statuses (this should come from your API ideally)
    const providers = ref([
      'Semua Provider',
      'Kimia Farma',
      'Siloam',
      'Karya Husyada',
      'Bakti Husyada',
    ])
    const spesialisasi = ref([
      'Semua Spesialisasi',
      'Umum',
      'Anak',
      'Jantung',
      'Mata',
    ])
    const statuses = ref(['Aktif', 'Non Aktif'])

    // Computed property for filtered doctors
    const filteredDoctors = computed(() => {
      return dokters.value.filter((dokter) => {
        const matchesSearch = dokter.nama
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
        const matchesProvider = selectedProvider.value
          ? dokter.provider === selectedProvider.value
          : true
        const matchesSpesialis = selectedSpesialis.value
          ? dokter.spesialis === selectedSpesialis.value
          : true
        const matchesStatus = selectedStatus.value
          ? dokter.status === selectedStatus.value
          : true
        const matchesDate = selectedDate.value
          ? dokter.tanggalDibuat === selectedDate.value
          : true

        return (
          matchesSearch &&
          matchesProvider &&
          matchesSpesialis &&
          matchesStatus &&
          matchesDate
        )
      })
    })

    // Computed property for pagination
    const paginatedDoctors = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage
      const end = start + rowsPerPage
      return filteredDoctors.value.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredDoctors.value.length / rowsPerPage)
    })

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    // Fetch data from API on mount
    onMounted(async () => {
      try {
        const response = await axios.get('/api/dokter')
        dokters.value = response.data // Pastikan respons dari API sesuai dengan tipe Dokter[]
      } catch (error) {
        console.log(error)
      }
    })

    // Fungsi untuk menambah dokter baru
    const tambahDokter = () => {
      const newDokter: Dokter = {
        id: nextId.value,
        nama: nama.value,
        provider: provider.value,
        spesialis: spesialis.value,
        tanggalDibuat: tanggalDibuat.value,
        status: status.value,
      }

      dokters.value.push(newDokter) // Menambahkan dokter baru

      // Reset form
      nama.value = ''
      provider.value = ''
      spesialis.value = ''
      tanggalDibuat.value = ''
      status.value = 'Aktif'

      // Sembunyikan formulir setelah menambah dokter
      showForm.value = true
    }

    // const tambahDokter = () => {
    //   axios.post(apiURL, {
    //     id: nextId.value,
    //     nama: nama.value,
    //     provider: provider.value,
    //     spesialis: spesialis.value,
    //     tanggalDibuat: tanggalDibuat.value,
    //     status: status.value,
    //   })
    // }

    // const getDocor = () => {
    //   axios.get(apiURL).then((response) => {
    //     dokters.value = response.data
    //   })
    // }

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const spesialisasiToggleDropdown = () => {
      isSpesialisasiDropDownOpen.value = !isSpesialisasiDropDownOpen.value
    }

    return {
      dokters,
      paginatedDoctors,
      currentPage,
      totalPages,
      goToPage,
      searchQuery,
      selectedProvider,
      selectedSpesialis,
      selectedStatus,
      selectedDate,
      providers,
      spesialisasi,
      statuses,
      filteredDoctors, // Pastikan filteredDoctors juga dikembalikan di sini
      showForm,
      modalHandler,
      nama,
      nextId,
      provider,
      spesialis,
      tanggalDibuat,
      status,
      currentTab,
      isDropdownOpen,
      selectedGender,
      showFormButton,
      isSpesialisasiDropDownOpen,
      selectedSpesialisasi,
      spesialisasiToggleDropdown,
      toggleDropdown,
      tambahDokter, // Menambahkan fungsi tambahDokter ke dalam return
    }
  },
})
