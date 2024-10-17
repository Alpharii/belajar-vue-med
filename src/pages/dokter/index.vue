<template>
  <div class="bg-slate-100 w-full h-full">
    <div class="p-10 flex items-center justify-between">
      <div class="-mt-5">
        <h1 class="text-slate-600">Provider - Dokter</h1>
        <h1 class="text-blue-600 font-semibold text-3xl pt-10 -mt-5">Dokter</h1>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full"
        @click="
          () => {
            showForm = 'tambahDokter'
            showFormButton = false
            currentTab = 'informasiDokter'
          }
        "
        v-if="showFormButton"
      >
        + Tambah Dokter
      </button>

      <!-- Button untuk membatalkan form -->
      <button
        @click="
          () => {
            showForm = 'home'
            showFormButton = true
            currentTab = 'informasiDokter'
          }
        "
        v-if="!showFormButton"
        class="text-black font-bold -mt-5"
      >
        Kembali
      </button>
    </div>
    <div class="p-10 mx-10 bg-white" v-if="showForm === 'home'">
      <!-- Search Input -->
      <div class="mb-4 flex items-center space-x-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari Dokter..."
          class="border rounded py-2 px-4 flex-grow"
        />

        <!-- Filter Controls -->
        <div class="flex items-center space-x-2">
          <select v-model="selectedProvider" class="border rounded">
            <option value="">Provider</option>
            <option
              v-for="provider in providers"
              :key="provider"
              :value="provider"
            >
              {{ provider }}
            </option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <select v-model="selectedSpesialis" class="border rounded">
            <option value="">Spesialis</option>
            <option
              v-for="spesialis in spesialisasi"
              :key="spesialis"
              :value="spesialis"
            >
              {{ spesialis }}
            </option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <select v-model="selectedStatus" class="border rounded">
            <option value="">Status</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <input
            type="date"
            v-model="selectedDate"
            id="tanggalDibuat"
            class="border rounded py-2 px-4"
            aria-placeholder="Tanggal Dibuat"
          />
        </div>
      </div>

      <!-- Header -->
      <ul class="grid grid-cols-7 gap-8 text-left mb-2 text-slate-600">
        <li>ID Dokter</li>
        <li>Nama Dokter</li>
        <li>Provider</li>
        <li>Spesialisasi</li>
        <li>Tanggal dibuat</li>
        <li>Status</li>
        <li>Aksi</li>
      </ul>
      <hr class="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />

      <!-- Data Dokter -->
      <ul
        class="grid grid-cols-7 gap-8 mt-8"
        v-for="dokter in paginatedDoctors"
        :key="dokter.id"
      >
        <li>{{ dokter.id }}</li>
        <li>{{ dokter.nama }}</li>
        <li>{{ dokter.provider }}</li>
        <li>{{ dokter.spesialis }}</li>
        <li>{{ dokter.tanggalDibuat }}</li>
        <li>{{ dokter.status }}</li>
        <li>
          <button
            @click="
              () => {
                showForm = 'detailDokter'
                selectedDetailDokter = dokter
                showFormButton = false
              }
            "
            class="bg-purple-500 hover:bg-purple-700 w-7 h-7 rounded-md"
          ></button>
        </li>
      </ul>

      <div class="flex items-center justify-between mt-10">
        <h1 class="text-lg">Rows per page: 8</h1>

        <div class="flex items-center">
          <!-- Previous Button -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 mx-2 bg-blue-300 rounded"
          >
            Previous
          </button>

          <!-- Pagination Numbers -->
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-4 py-2 mx-1',
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-blue-300',
            ]"
          >
            {{ page }}
          </button>

          <!-- Ellipsis for quick navigation to last page -->
          <button
            v-if="totalPages > 1"
            @click="goToPage(totalPages)"
            class="px-4 py-2 mx-2 bg-blue-300 rounded"
          >
            [{{ totalPages <= 2 ? '2' : totalPages }}]
          </button>

          <!-- Next Button -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 mx-2 bg-blue-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <div class="p-10 mx-10 bg-white" v-if="showForm === 'tambahDokter'">
      <div>
        <ul class="flex">
          <li
            @click="currentTab = 'informasiDokter'"
            :class="
              currentTab === 'informasiDokter'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mx-7'
                : 'text-black cursor-pointer text-xl mx-7'
            "
          >
            1. Informasi Dokter
          </li>
          <li
            @click="currentTab = 'dokumentasi'"
            :class="
              currentTab === 'dokumentasi'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mr-7'
                : 'text-black cursor-pointer text-xl mr-7'
            "
          >
            2. Dokumentasi
          </li>
          <li
            @click="currentTab = 'tempatPraktik'"
            :class="
              currentTab === 'tempatPraktik'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mr-5'
                : 'text-black cursor-pointer text-xl mr-5'
            "
          >
            3. Tempat Praktik
          </li>
        </ul>
        <hr class="h-0.5 bg-gray-200 border-0 dark:bg-gray-400" />
        <!-- Content Rendering -->
        <div
          v-if="currentTab === 'informasiDokter'"
          class="h-full bg-gray-200 rounded-md m-1 mt-5 p-5"
        >
          <h1 class="text-lg">Id</h1>
          <input
            type="number"
            v-model="nextId"
            placeholder="Masukan Id Dokter"
            required
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Nama Lengkap dan Jabatan</h1>
          <input
            type="text"
            v-model="nama"
            placeholder="Masukan Nama Lengkap dan Jabatan"
            required
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Nomor STR</h1>
          <input
            type="number"
            placeholder="Masukan Nomor STR"
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Tempat Lahir</h1>
          <input
            type="text"
            placeholder="Masukan Tempat Lahir"
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Tanggal Lahir</h1>
          <input
            type="date"
            placeholder="Masukan Tanggal Lahir"
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Jenis Kelamin</h1>
          <div class="relative">
            <!-- Dropdown Button -->
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="w-full p-2 text-left bg-white border border-gray-300 rounded-md text-lg"
            >
              {{ selectedGender ? selectedGender : 'Pilih Jenis Kelamin' }}
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <label class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Laki-laki"
                  v-model="selectedGender"
                  @change="toggleDropdown"
                  class="form-radio text-purple-600"
                />
                <span class="ml-2">Laki-laki</span>
              </label>

              <label class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Perempuan"
                  v-model="selectedGender"
                  @change="toggleDropdown"
                  class="form-radio text-purple-600"
                />
                <span class="ml-2">Perempuan</span>
              </label>
            </div>
            <h1 class="text-lg mt-3">Nomor HP</h1>
            <input
              type="number"
              v-model="nama"
              placeholder="Masukan Nomor HP"
              required
              class="w-full m-1 rounded-md bg-white p-2 text-lg"
            />
            <h1 class="text-lg mt-3">Email</h1>
            <input
              type="text"
              v-model="nama"
              placeholder="Masukan Email"
              required
              class="w-full m-1 rounded-md bg-white p-2 text-lg"
            />

            <!-- Dropdown Menu -->
            <h1 class="text-lg mt-3">Spesialisasi</h1>
            <button
              @click="isSpesialisasiDropDownOpen = !isSpesialisasiDropDownOpen"
              class="w-full p-2 text-left bg-white border border-gray-300 rounded-md text-lg"
            >
              {{
                selectedSpesialisasi
                  ? selectedSpesialisasi
                  : 'Pilih Spesialisasi'
              }}
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isSpesialisasiDropDownOpen"
              class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <label
                v-for="spesialisasiItem in spesialisasi"
                :key="spesialisasiItem"
                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="radio"
                  name="spesialisasi"
                  :value="spesialisasiItem"
                  v-model="selectedSpesialisasi"
                  @change="spesialisasiToggleDropdown"
                  class="form-radio text-purple-600"
                />
                <span class="ml-2">{{ spesialisasiItem }}</span>
              </label>
            </div>

            <h1 class="text-lg mt-3">Biografi</h1>
            <input
              type="text"
              v-model="nama"
              placeholder="Masukan Biografi"
              required
              class="w-full m-1 rounded-md bg-white p-2 text-lg"
            />
          </div>
        </div>
        <div class="flex justify-end mt-5">
          <button
            @click="currentTab = 'dokumentasi'"
            v-if="currentTab === 'informasiDokter'"
            class="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl"
          >
            Simpan dan Selanjutnya
          </button>
        </div>

        <div v-if="currentTab === 'dokumentasi'">
          <div>
            <h1>Foto Dokter</h1>
            <label
              class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
            >
              <span class="text-slate-500">Pilih Gambar</span>
              <input type="file" accept="image/*" class="hidden" />
            </label>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
          <div>
            <h1 class="mt-5">Foto STR</h1>
            <label
              class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
            >
              <span class="text-slate-500">Pilih Gambar</span>
              <input type="file" accept="image/*" class="hidden" />
            </label>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
          <div>
            <h1 class="mt-5">Foto SIP</h1>
            <div class="flex">
              <label
                class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
              >
                <span class="text-slate-500">Pilih Gambar</span>
                <input type="file" accept="image/*" class="hidden" />
              </label>
              <label
                class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer ml-4 justify-center items-center mt-3"
              >
                <span class="text-slate-500">Pilih Gambar</span>
                <input type="file" accept="image/*" class="hidden" />
              </label>
            </div>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
        </div>
        <div class="flex justify-end mt-5">
          <button
            @click="currentTab = 'informasiDokter'"
            v-if="currentTab === 'dokumentasi'"
            class="px-20 py-4 bg-white border border-blue-600 text-blue-600 font-bold rounded-2xl mr-6"
          >
            Sebelumnya
          </button>
          <button
            @click="currentTab = 'tempatPraktik'"
            v-if="currentTab === 'dokumentasi'"
            class="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl"
          >
            Simpan dan Selanjutnya
          </button>
        </div>

        <div v-if="currentTab === 'tempatPraktik'">
          <div class="flex justify-end mb-5 -mt-5">
            <button
              v-if="currentTab === 'tempatPraktik'"
              class="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mr-6"
            >
              Tambah Tempat Praktik
            </button>
          </div>
          <ul
            class="grid grid-cols-8 gap-8 text-left mb-2 text-slate-600 mt-11"
          >
            <li>Nama Faskes</li>
            <li>Provider</li>
            <li>No SIP</li>
            <li>Layanan</li>
            <li>Jenis Layanan</li>
            <li>Harga Layanan</li>
            <li>Jadwal</li>
            <li>Aksi</li>
          </ul>
          <hr class="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />
        </div>
        <div class="flex justify-end">
          <button
            @click="currentTab = 'dokumentasi'"
            v-if="currentTab === 'tempatPraktik'"
            class="px-16 py-4 bg-white border border-blue-600 text-blue-600 font-bold rounded-2xl mr-6"
          >
            Sebelumnya
          </button>
          <button
            @click="
              () => {
                modalHandler = true
                //addDoctor()
              }
            "
            v-if="currentTab === 'tempatPraktik'"
            class="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mr-6"
          >
            Simpan Dokter
          </button>
        </div>
      </div>
    </div>
    <div v-if="modalHandler" class="modal-overlay">
      <div
        class="p-10 px-20 text-2xl rounded-xl shadow-2xl bg-white inline-block"
      >
        <div class="flex justify-center">
          <img
            class="w-40 h-40 justify-center"
            src="https://banner2.cleanpng.com/20180315/djw/av0u3beuj.webp"
            alt="Succes"
          />
        </div>
        <h1 class="justify-center mt-5 text-2xl font-semibold text-center">
          Sukses!
        </h1>
        <h1 class="justify-cente text-slate-600 text-lg text-center">
          Berhasil Menambahkan Dokter
        </h1>
        <div class="flex justify-center">
          <button
            class="bg-purple-600 border-2 shadow-md border-blue-9000 p-3 text-white rounded-xl px-36 justify-center mt-10"
            @click="
              () => {
                showForm = 'home'
                showFormButton = true
                modalHandler = false
              }
            "
          >
            OKE
          </button>
        </div>
      </div>
    </div>

    <div class="p-10 mx-10 bg-white" v-if="showForm === 'detailDokter'">
      <div class="-mt-2">
        <div class="flex mb-8 items-center">
          <div
            class="w-16 h-16 rounded-full bg-purple-500 border-2 border-white"
          ></div>
          <div class="flex flex-col ml-5">
            <h1 class="font-semibold text-2xl">
              {{ selectedDetailDokter?.nama }}
            </h1>
            <h1 class="text-slate-500 text-xl">
              id : {{ selectedDetailDokter?.id }}
            </h1>
          </div>
          <div class="ml-auto">
            <!-- Gunakan ml-auto di sini -->
            <button
              class="text-white bg-blue-600 px-8 py-3 rounded-3xl text-xl"
              v-if="showForm === 'detailDokter'"
              @click="
                () => {
                  showForm = 'editDokter'
                  showFormButton = false
                  currentTab = 'informasiDokter'
                }
              "
            >
              EDIT DOKTER
            </button>
          </div>
        </div>

        <ul class="flex">
          <li
            @click="currentTab = 'informasiDokter'"
            :class="
              currentTab === 'informasiDokter'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mx-7'
                : 'text-black cursor-pointer text-xl mx-7'
            "
          >
            1. Informasi Dokter
          </li>
          <li
            @click="currentTab = 'dokumentasi'"
            :class="
              currentTab === 'dokumentasi'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mr-7'
                : 'text-black cursor-pointer text-xl mr-7'
            "
          >
            2. Dokumentasi
          </li>
          <li
            @click="currentTab = 'tempatPraktik'"
            :class="
              currentTab === 'tempatPraktik'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mr-5'
                : 'text-black cursor-pointer text-xl mr-5'
            "
          >
            3. Tempat Praktik
          </li>
        </ul>
        <hr class="h-0.5 bg-gray-200 border-0 dark:bg-gray-400" />
        <!-- Content Rendering -->
        <div
          v-if="currentTab === 'informasiDokter'"
          class="h-full bg-gray-200 rounded-md m-1 mt-5 p-5"
        >
          <h1 class="font-bold text-xl">Biografi</h1>
          <h1 class="font-light text-lg text-slate-600 mt-1">
            Dokter {{ selectedDetailDokter?.nama }} merupakan seorang Spesialis
            Dokter Anak yang telah mengabdi selama kurang lebih 5 tahun didunia
            medis. Dokter Nur Nadila merupakan lulusan S1 Kedokteran Universitas
            Indonesia pada tahun 2012 dan S2 Spesialisasi Anak Harvard
            University pada tahun 2018.
          </h1>
          <div class="flex mt-5 items-center">
            <h1 class="text-lg w-1/5">Nomor STR</h1>
            <input
              type="text"
              value="Nomor STR"
              readonly
              required
              class="m-1 rounded-md bg-white p-2 text-lg ml-4 w-full"
            />
          </div>
          <div class="flex mt-5 items-center">
            <h1 class="text-lg w-1/5">Tempat Lahir</h1>
            <input
              type="text"
              value="Sleman"
              readonly
              required
              class="m-1 rounded-md bg-white p-2 text-lg ml-4 w-full"
            />
          </div>
          <div class="flex mt-5 items-center">
            <h1 class="text-lg w-1/5">Tanggal Lahir</h1>
            <input
              type="text"
              value="17 Agustus 1945"
              readonly
              required
              class="m-1 rounded-md bg-white p-2 text-lg ml-4 w-full"
            />
          </div>
          <div class="flex mt-5 items-center">
            <h1 class="text-lg w-1/5">Jenis Kelamin</h1>
            <input
              type="text"
              value="Laki-laki"
              readonly
              required
              class="m-1 rounded-md bg-white p-2 text-lg ml-4 w-full"
            />
          </div>
          <div class="flex mt-5 items-center">
            <h1 class="text-lg w-1/5">Nomor Telepon</h1>
            <input
              type="number"
              value="081234567890"
              readonly
              required
              class="m-1 rounded-md bg-white p-2 text-lg ml-4 w-full"
            />
          </div>
          <div class="flex mt-5 items-center">
            <h1 class="text-lg w-1/5">Email</h1>
            <input
              type="text"
              value="email@gmail.com"
              readonly
              required
              class="m-1 rounded-md bg-white p-2 text-lg ml-4 w-full"
            />
          </div>
          <div class="flex mt-5 items-center">
            <h1 class="text-lg w-1/5">Spesialisasi</h1>
            <input
              type="text"
              :value="selectedDetailDokter?.spesialis || 'Umum'"
              readonly
              required
              class="m-1 rounded-md bg-white p-2 text-lg ml-4 w-full"
            />
          </div>
        </div>

        <div v-if="currentTab === 'dokumentasi'">
          <div>
            <h1 class="mt-5">Foto STR</h1>
            <label
              class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
            >
              <span class="text-slate-500">Pilih Gambar</span>
              <input type="file" accept="image/*" class="hidden" />
            </label>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
          <div>
            <h1 class="mt-5">Foto SIP</h1>
            <div class="flex">
              <label
                class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
              >
                <span class="text-slate-500">Pilih Gambar</span>
                <input type="file" accept="image/*" class="hidden" />
              </label>
              <label
                class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer ml-4 justify-center items-center mt-3"
              >
                <span class="text-slate-500">Pilih Gambar</span>
                <input type="file" accept="image/*" class="hidden" />
              </label>
            </div>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
        </div>
        <div class="flex justify-end mt-5">
          <button
            @click="currentTab = 'informasiDokter'"
            v-if="currentTab === 'dokumentasi'"
            class="px-20 py-4 bg-white border border-blue-600 text-blue-600 font-bold rounded-2xl mr-6"
          >
            Sebelumnya
          </button>
          <button
            @click="currentTab = 'tempatPraktik'"
            v-if="currentTab === 'dokumentasi'"
            class="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl"
          >
            Simpan dan Selanjutnya
          </button>
        </div>

        <div v-if="currentTab === 'tempatPraktik'">
          <ul
            class="grid grid-cols-8 gap-8 text-left mb-2 text-slate-500 mt-11 text-lg"
          >
            <li>Nama Faskes</li>
            <li>Provider</li>
            <li>No SIP</li>
            <li>Layanan</li>
            <li>Jenis Layanan</li>
            <li>Harga Layanan</li>
            <li>Jadwal</li>
            <li>Aksi</li>
          </ul>
          <hr class="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />
        </div>
        <div class="flex justify-end">
          <button
            @click="currentTab = 'dokumentasi'"
            v-if="currentTab === 'tempatPraktik'"
            class="px-16 py-4 bg-white border border-blue-600 text-blue-600 font-bold rounded-2xl mr-6"
          >
            Sebelumnya
          </button>
          <button
            @click="
              () => {
                modalHandler = true
                //addDoctor()
              }
            "
            v-if="currentTab === 'tempatPraktik'"
            class="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mr-6"
          >
            Simpan Dokter
          </button>
        </div>
      </div>
    </div>

    <div class="p-10 mx-10 bg-white" v-if="showForm === 'editDokter'">
      <div class="-mt-2">
        <div class="flex mb-8 items-center">
          <div
            class="w-16 h-16 rounded-full bg-purple-500 border-2 border-white"
          ></div>
          <div class="flex flex-col ml-5">
            <h1 class="font-semibold text-2xl">
              {{ selectedDetailDokter?.nama }}
            </h1>
            <h1 class="text-slate-500 text-xl">
              id : {{ selectedDetailDokter?.id }}
            </h1>
          </div>
          <div class="ml-auto">
            <!-- Gunakan ml-auto di sini -->
            <button
              class="text-white bg-blue-600 px-8 py-3 rounded-3xl text-xl"
              @click="
                () => {
                  showForm = 'editDokter'
                  showFormButton = false
                  currentTab = 'informasiDokter'
                  modalHandler = true
                }
              "
            >
              SIMPAN PERUBAHAN
            </button>
          </div>
        </div>

        <ul class="flex">
          <li
            @click="currentTab = 'informasiDokter'"
            :class="
              currentTab === 'informasiDokter'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mx-7'
                : 'text-black cursor-pointer text-xl mx-7'
            "
          >
            1. Informasi Dokter
          </li>
          <li
            @click="currentTab = 'dokumentasi'"
            :class="
              currentTab === 'dokumentasi'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mr-7'
                : 'text-black cursor-pointer text-xl mr-7'
            "
          >
            2. Dokumentasi
          </li>
          <li
            @click="currentTab = 'tempatPraktik'"
            :class="
              currentTab === 'tempatPraktik'
                ? 'text-purple-500 font-bold border-b-4 border-purple-500 text-xl mr-5'
                : 'text-black cursor-pointer text-xl mr-5'
            "
          >
            3. Tempat Praktik
          </li>
        </ul>
        <hr class="h-0.5 bg-gray-200 border-0 dark:bg-gray-400" />
        <!-- Content Rendering -->
        <div
          v-if="currentTab === 'informasiDokter'"
          class="h-full bg-gray-200 rounded-md m-1 mt-5 p-5"
        >
          <h1 class="text-lg">Id</h1>
          <input
            type="number"
            v-model="nextId"
            placeholder="Masukan Id Dokter"
            required
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Nama Lengkap dan Jabatan</h1>
          <input
            type="text"
            v-model="nama"
            placeholder="Masukan Nama Lengkap dan Jabatan"
            required
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Nomor STR</h1>
          <input
            type="number"
            placeholder="Masukan Nomor STR"
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Tempat Lahir</h1>
          <input
            type="text"
            placeholder="Masukan Tempat Lahir"
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Tanggal Lahir</h1>
          <input
            type="date"
            placeholder="Masukan Tanggal Lahir"
            class="w-full m-1 rounded-md bg-white p-2 text-lg"
          />
          <h1 class="text-lg mt-3">Jenis Kelamin</h1>
          <div class="relative">
            <!-- Dropdown Button -->
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="w-full p-2 text-left bg-white border border-gray-300 rounded-md text-lg"
            >
              {{ selectedGender ? selectedGender : 'Pilih Jenis Kelamin' }}
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <label class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Laki-laki"
                  v-model="selectedGender"
                  @change="toggleDropdown"
                  class="form-radio text-purple-600"
                />
                <span class="ml-2">Laki-laki</span>
              </label>

              <label class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Perempuan"
                  v-model="selectedGender"
                  @change="toggleDropdown"
                  class="form-radio text-purple-600"
                />
                <span class="ml-2">Perempuan</span>
              </label>
            </div>
            <h1 class="text-lg mt-3">Nomor HP</h1>
            <input
              type="number"
              v-model="nama"
              placeholder="Masukan Nomor HP"
              required
              class="w-full m-1 rounded-md bg-white p-2 text-lg"
            />
            <h1 class="text-lg mt-3">Email</h1>
            <input
              type="text"
              v-model="nama"
              placeholder="Masukan Email"
              required
              class="w-full m-1 rounded-md bg-white p-2 text-lg"
            />

            <!-- Dropdown Menu -->
            <h1 class="text-lg mt-3">Spesialisasi</h1>
            <button
              @click="isSpesialisasiDropDownOpen = !isSpesialisasiDropDownOpen"
              class="w-full p-2 text-left bg-white border border-gray-300 rounded-md text-lg"
            >
              {{
                selectedSpesialisasi
                  ? selectedSpesialisasi
                  : 'Pilih Spesialisasi'
              }}
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isSpesialisasiDropDownOpen"
              class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <label
                v-for="spesialisasiItem in spesialisasi"
                :key="spesialisasiItem"
                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="radio"
                  name="spesialisasi"
                  :value="spesialisasiItem"
                  v-model="selectedSpesialisasi"
                  @change="spesialisasiToggleDropdown"
                  class="form-radio text-purple-600"
                />
                <span class="ml-2">{{ spesialisasiItem }}</span>
              </label>
            </div>

            <h1 class="text-lg mt-3">Biografi</h1>
            <input
              type="text"
              v-model="nama"
              placeholder="Masukan Biografi"
              required
              class="w-full m-1 rounded-md bg-white p-2 text-lg"
            />
          </div>
        </div>

        <div v-if="currentTab === 'dokumentasi'">
          <div>
            <h1 class="mt-5">Foto Dokter</h1>
            <label
              class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
            >
              <span class="text-slate-500">Pilih Gambar</span>
              <input type="file" accept="image/*" class="hidden" />
            </label>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
          <div>
            <h1 class="mt-5">Foto STR</h1>
            <label
              class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
            >
              <span class="text-slate-500">Pilih Gambar</span>
              <input type="file" accept="image/*" class="hidden" />
            </label>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
          <div>
            <h1 class="mt-5">Foto SIP</h1>
            <div class="flex">
              <label
                class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer justify-center items-center mt-3"
              >
                <span class="text-slate-500">Pilih Gambar</span>
                <input type="file" accept="image/*" class="hidden" />
              </label>
              <label
                class="w-32 h-32 border-2 border-dashed border-slate-400 flex cursor-pointer ml-4 justify-center items-center mt-3"
              >
                <span class="text-slate-500">Pilih Gambar</span>
                <input type="file" accept="image/*" class="hidden" />
              </label>
            </div>
            <h1 class="text-sm mt-3 text-slate-500">
              *Format wajib .jpg / .jpeg / .png
            </h1>
            <h1 class="text-sm text-slate-500">*Maksimal file size 5 mb</h1>
          </div>
        </div>

        <div v-if="currentTab === 'tempatPraktik'">
          <div class="flex justify-end mb-5 -mt-5">
            <button
              v-if="currentTab === 'tempatPraktik'"
              class="px-10 py-3 bg-blue-600 mt-10 hover:bg-blue-700 text-white font-bold rounded-2xl mr-6"
            >
              Tambah Tempat Praktik
            </button>
          </div>
          <ul
            class="grid grid-cols-8 gap-8 text-left mb-2 text-slate-600 mt-11"
          >
            <li>Nama Faskes</li>
            <li>Provider</li>
            <li>No SIP</li>
            <li>Layanan</li>
            <li>Jenis Layanan</li>
            <li>Harga Layanan</li>
            <li>Jadwal</li>
            <li>Aksi</li>
          </ul>
          <hr class="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style src="./index.css" scoped></style>
