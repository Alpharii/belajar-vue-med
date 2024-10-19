import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// Definisikan tipe Dokter
interface Dokter {
  id: number
  nama: string
  provider: string
  spesialis: string
  tanggalDibuat: string
  status: string
}

export const useDokterStore = defineStore('dokterStore', () => {
  const dokters = ref<Dokter[]>([])
  const currentPage = ref(1)
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

  const fetchDokters = async () => {
    try {
      const response = await axios.get(`${import.meta.env.API_URL}/dokter`) // Ganti dengan URL API asli kamu
      dokters.value = response.data // Asumsikan API mengembalikan array dokter
    } catch (error) {
      console.error('Error fetching data:', error)
    }
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
    fetchDokters,
  }
})
