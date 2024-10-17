import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dataDummy from './dataDummy'

// Definisikan tipe Dokter
interface Dokter {
  id: number
  nama: string
  provider: string
  spesialis: string
  tanggalDibuat: string
  status: string
}

// Dummy data
const dummyDokter: Dokter[] = dataDummy

export const useDokterStore = defineStore('dokterStore', () => {
  const dokters = ref<Dokter[]>(dummyDokter)
  const currentPage = ref(1)
  const rowsPerPage = 8
  const searchQuery = ref('')
  const selectedProvider = ref('')
  const selectedSpesialis = ref('')
  const selectedStatus = ref('')
  const selectedDate = ref('')
  const showForm = ref('home')
  const nama = ref('')
  const provider = ref('')
  const spesialis = ref('')
  const tanggalDibuat = ref('')
  const status = ref('Aktif')
  const nextId = ref(dokters.value.length + 1)

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

  // Computed properties
  const filteredDoctors = computed(() => {
    return dokters.value.filter((dokter) => {
      const matchesSearch = dokter.nama
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())

      const matchesProvider =
        selectedProvider.value && selectedProvider.value !== 'Semua Provider'
          ? dokter.provider === selectedProvider.value
          : true

      const matchesSpesialis =
        selectedSpesialis.value &&
        selectedSpesialis.value !== 'Semua Spesialisasi'
          ? dokter.spesialis === selectedSpesialis.value
          : true

      const matchesStatus =
        selectedStatus.value && selectedStatus.value !== ''
          ? dokter.status === selectedStatus.value
          : true

      const matchesDate =
        selectedDate.value && selectedDate.value !== ''
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

  const paginatedDoctors = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredDoctors.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredDoctors.value.length / rowsPerPage)
  })

  // Actions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const tambahDokter = () => {
    const newDokter: Dokter = {
      id: nextId.value,
      nama: nama.value,
      provider: provider.value,
      spesialis: spesialis.value,
      tanggalDibuat: tanggalDibuat.value,
      status: status.value,
    }

    dokters.value.push(newDokter)

    // Reset form
    nama.value = ''
    provider.value = ''
    spesialis.value = ''
    tanggalDibuat.value = ''
    status.value = 'Aktif'
    showForm.value = 'home'
    nextId.value++
  }

  return {
    dokters,
    currentPage,
    searchQuery,
    selectedProvider,
    selectedSpesialis,
    selectedStatus,
    selectedDate,
    showForm,
    nama,
    provider,
    spesialis,
    tanggalDibuat,
    status,
    nextId,
    providers,
    spesialisasi,
    statuses,
    filteredDoctors,
    paginatedDoctors,
    totalPages,
    goToPage,
    tambahDokter,
  }
})
