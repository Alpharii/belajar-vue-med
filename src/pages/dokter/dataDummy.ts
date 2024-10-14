const dataDummy = [
  {
    id: 1,
    nama: 'Dr. Budi',
    provider: 'Kimia Farma',
    spesialis: 'Mata',
    tanggalDibuat: '2022-01-01',
    status: 'Aktif',
  },
  {
    id: 2,
    nama: 'Dr. Siti',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-01-01',
    status: 'Non Aktif',
  },
  {
    id: 3,
    nama: 'Dr. Tono',
    provider: 'Karya Husyada',
    spesialis: 'Mata',
    tanggalDibuat: '2022-01-01',
    status: 'Aktif',
  },
  {
    id: 4,
    nama: 'Dr. Dina',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-01-01',
    status: 'Non Aktif',
  },
  {
    id: 5,
    nama: 'Dr. Bambang',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-01-01',
    status: 'Aktif',
  },
  {
    id: 6,
    nama: 'Dr. Sri',
    provider: 'Karya Husyada',
    spesialis: 'Anak',
    tanggalDibuat: '2022-01-01',
    status: 'Non Aktif',
  },
  {
    id: 7,
    nama: 'Dr. Rudi',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-01-01',
    status: 'Aktif',
  },
  {
    id: 8,
    nama: 'Dr. Siti',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-01-01',
    status: 'Aktif',
  },
  {
    id: 9,
    nama: 'Dr. Fuad',
    provider: 'Karya Husyada',
    spesialis: 'Mata',
    tanggalDibuat: '2022-01-01',
    status: 'Aktif',
  },
  {
    id: 10,
    nama: 'Dr. Ambappe',
    provider: 'Kimia Farma',
    spesialis: 'Mata',
    tanggalDibuat: '2022-01-01',
    status: 'Non Aktif',
  },
  {
    id: 11,
    nama: 'Dr. Joko',
    provider: 'Siloam',
    spesialis: 'Umum',
    tanggalDibuat: '2022-02-01',
    status: 'Aktif',
  },
  {
    id: 12,
    nama: 'Dr. Leni',
    provider: 'Karya Husyada',
    spesialis: 'Semua Spesialisasi',
    tanggalDibuat: '2022-02-01',
    status: 'Aktif',
  },
  {
    id: 13,
    nama: 'Dr. Nila',
    provider: 'Kimia Farma',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-02-01',
    status: 'Non Aktif',
  },
  {
    id: 14,
    nama: 'Dr. Eko',
    provider: 'Siloam',
    spesialis: 'Umum',
    tanggalDibuat: '2022-02-01',
    status: 'Aktif',
  },
  {
    id: 15,
    nama: 'Dr. Maya',
    provider: 'Karya Husyada',
    spesialis: 'Anak',
    tanggalDibuat: '2022-02-01',
    status: 'Aktif',
  },
  {
    id: 16,
    nama: 'Dr. Arief',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-03-01',
    status: 'Non Aktif',
  },
  {
    id: 17,
    nama: 'Dr. Hani',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-03-01',
    status: 'Aktif',
  },
  {
    id: 18,
    nama: 'Dr. Rina',
    provider: 'Bakti Husyada',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-03-01',
    status: 'Aktif',
  },
  {
    id: 19,
    nama: 'Dr. Rizky',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-03-01',
    status: 'Non Aktif',
  },
  {
    id: 20,
    nama: 'Dr. Tia',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-03-01',
    status: 'Aktif',
  },
  {
    id: 21,
    nama: 'Dr. Yudi',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-04-01',
    status: 'Aktif',
  },
  {
    id: 22,
    nama: 'Dr. Citra',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-04-01',
    status: 'Non Aktif',
  },
  {
    id: 23,
    nama: 'Dr. Arman',
    provider: 'Bakti Husyada',
    spesialis: 'Umum',
    tanggalDibuat: '2022-04-01',
    status: 'Aktif',
  },
  {
    id: 24,
    nama: 'Dr. Fira',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-04-01',
    status: 'Non Aktif',
  },
  {
    id: 25,
    nama: 'Dr. Raka',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-04-01',
    status: 'Aktif',
  },
  {
    id: 26,
    nama: 'Dr. Nia',
    provider: 'Bakti Husyada',
    spesialis: 'Anak',
    tanggalDibuat: '2022-04-01',
    status: 'Non Aktif',
  },
  {
    id: 27,
    nama: 'Dr. Ivan',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-04-01',
    status: 'Aktif',
  },
  {
    id: 28,
    nama: 'Dr. Selma',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-04-01',
    status: 'Aktif',
  },
  {
    id: 29,
    nama: 'Dr. Andi',
    provider: 'Karya Husyada',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-04-01',
    status: 'Aktif',
  },
  {
    id: 30,
    nama: 'Dr. Tania',
    provider: 'Kimia Farma',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-04-01',
    status: 'Non Aktif',
  },
  {
    id: 31,
    nama: 'Dr. Hendra',
    provider: 'Siloam',
    spesialis: 'Umum',
    tanggalDibuat: '2022-05-01',
    status: 'Aktif',
  },
  {
    id: 32,
    nama: 'Dr. Dwi',
    provider: 'Karya Husyada',
    spesialis: 'Anak',
    tanggalDibuat: '2022-05-01',
    status: 'Aktif',
  },
  {
    id: 33,
    nama: 'Dr. Purnama',
    provider: 'Kimia Farma',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-05-01',
    status: 'Non Aktif',
  },
  {
    id: 34,
    nama: 'Dr. Rian',
    provider: 'Siloam',
    spesialis: 'Umum',
    tanggalDibuat: '2022-05-01',
    status: 'Aktif',
  },
  {
    id: 35,
    nama: 'Dr. Indah',
    provider: 'Karya Husyada',
    spesialis: 'Anak',
    tanggalDibuat: '2022-05-01',
    status: 'Aktif',
  },
  {
    id: 36,
    nama: 'Dr. Iwan',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-06-01',
    status: 'Aktif',
  },
  {
    id: 37,
    nama: 'Dr. Nisa',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-06-01',
    status: 'Aktif',
  },
  {
    id: 38,
    nama: 'Dr. Rizal',
    provider: 'Karya Husyada',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-06-01',
    status: 'Aktif',
  },
  {
    id: 39,
    nama: 'Dr. Adi',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-06-01',
    status: 'Non Aktif',
  },
  {
    id: 40,
    nama: 'Dr. Khairun',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-06-01',
    status: 'Aktif',
  },
  {
    id: 41,
    nama: 'Dr. Fadli',
    provider: 'Karya Husyada',
    spesialis: 'Umum',
    tanggalDibuat: '2022-07-01',
    status: 'Aktif',
  },
  {
    id: 42,
    nama: 'Dr. Putri',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-07-01',
    status: 'Non Aktif',
  },
  {
    id: 43,
    nama: 'Dr. Wahyu',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-07-01',
    status: 'Aktif',
  },
  {
    id: 44,
    nama: 'Dr. Sari',
    provider: 'Karya Husyada',
    spesialis: 'Anak',
    tanggalDibuat: '2022-07-01',
    status: 'Aktif',
  },
  {
    id: 45,
    nama: 'Dr. Miko',
    provider: 'Kimia Farma',
    spesialis: 'Umum',
    tanggalDibuat: '2022-07-01',
    status: 'Non Aktif',
  },
  {
    id: 46,
    nama: 'Dr. Fani',
    provider: 'Siloam',
    spesialis: 'Anak',
    tanggalDibuat: '2022-07-01',
    status: 'Aktif',
  },
  {
    id: 47,
    nama: 'Dr. Danu',
    provider: 'Karya Husyada',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-07-01',
    status: 'Aktif',
  },
  {
    id: 48,
    nama: 'Dr. Ciko',
    provider: 'Kimia Farma',
    spesialis: 'Jantung',
    tanggalDibuat: '2022-07-01',
    status: 'Aktif',
  },
  {
    id: 49,
    nama: 'Dr. Zain',
    provider: 'Siloam',
    spesialis: 'Mata',
    tanggalDibuat: '2022-08-01',
    status: 'Aktif',
  },
  {
    id: 50,
    nama: 'Dr. Taufik',
    provider: 'Karya Husyada',
    spesialis: 'Mata',
    tanggalDibuat: '2022-08-01',
    status: 'Non Aktif',
  },
]

export default dataDummy
