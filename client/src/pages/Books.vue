<template>
   <div class="books">
      <div class="books-container">
         <h2>📚 Kitaplık</h2>

         <div class="search-container">
            <input v-model="searchQuery" type="text" placeholder="Kitap Ara..." />
            <button class="add-book-btn" @click="openAdd()" v-if="isLoggedIn">
               <span class="material-icons">add</span> Kitap Ekle
            </button>
         </div>

         <BookList :books="filteredBooks" :is-logged-in="isLoggedIn" @edit="openEdit" @delete="deleteBook" />

         <BookFormDialog
            v-model="showAddModal"
            :book="emptyBook"
            :categories="categories"
            mode="add"
            @save="handleAdd"
         />

         <BookFormDialog
            v-model="showEditModal"
            :book="editingBook || emptyBook"
            :categories="categories"
            mode="edit"
            @save="handleUpdate"
         />
      </div>
   </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue"
import {BooksService} from "@/services"
import BookList from "@/components/BookList.vue"
import BookFormDialog from "@/components/BookFormDialog.vue"

const books = ref([])
const searchQuery = ref("")

const showAddModal = ref(false)
const showEditModal = ref(false)

const editingBook = ref(null)
const emptyBook = {title: "", author: "", category: ""}

const categories = ref([
   "Roman",
   "Tarih",
   "Bilim Kurgu (Sci-Fi)",
   "Felsefe",
   "Klasikler",
   "Çocuk Kitapları",
   "Psikoloji",
   "Kişisel Gelişim",
   "Mistik / Spiritüel",
   "Hikaye",
   "Edebiyat",
   "Biyografi / Otobiyografi",
   "Gerilim / Polisiye",
   "Macera",
])

const isLoggedIn = computed(() => !!localStorage.getItem("token"))

const filteredBooks = computed(() => {
   const q = searchQuery.value.trim().toLowerCase()
   if (!q) return books.value
   return books.value.filter(
      (b) =>
         (b.title || "").toLowerCase().includes(q) ||
         (b.author || "").toLowerCase().includes(q) ||
         (b.category || "").toLowerCase().includes(q),
   )
})

const fetchBooks = async () => {
   try {
      books.value = await BooksService.list()
   } catch (e) {
      console.error(e)
      alert("Kitaplar alınamadı")
   }
}

const openAdd = () => {
   showAddModal.value = true
}
const openEdit = (book) => {
   editingBook.value = {...book}
   showEditModal.value = true
}

const handleAdd = async (payload) => {
   try {
      if (!isLoggedIn.value) return alert("Lütfen önce giriş yapın.")
      await BooksService.create(payload)
      showAddModal.value = false
      await fetchBooks()
   } catch (e) {
      alert(e.response?.data?.message || "Ekleme başarısız")
      if (e.response?.status === 401) location.href = "/login"
   }
}

const handleUpdate = async (payload) => {
   try {
      await BooksService.update(payload._id, {
         title: payload.title,
         author: payload.author,
         category: payload.category,
      })
      showEditModal.value = false
      editingBook.value = null
      await fetchBooks()
   } catch {
      alert("Güncelleme başarısız")
   }
}

const deleteBook = async (id) => {
   try {
      console.log("Deleting book with ID:", id)
      await BooksService.remove(id)
      await fetchBooks()
   } catch {
      alert("Silme başarısız")
   }
}

onMounted(fetchBooks)
</script>

<style>
.material-icons {
   font-size: 14px;
}

.books {
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   background: #fdfaf6;
   font-family: "Segoe UI", sans-serif;
}
.books-container {
   background: #fff;
   padding: 2.5rem;
   border-radius: 12px;
   box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
   width: 100%;
   max-width: 700px;
}

.books h2 {
   /* sadece kitaplarda justify */
   text-align: justify;
   margin-bottom: 1.5rem;
}

ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
}

li {
   background: #f9f7f3;
   border-left: 6px solid #4e342e;
   padding: 0.8rem;
   margin-bottom: 0.75rem;
   border-radius: 6px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 1rem;
   transition: transform 0.2s ease, box-shadow 0.2s ease;
}
li:hover {
   transform: translateY(-2px);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

strong {
   color: #4e342e;
   font-size: 1.1rem;
}
span {
   font-size: 0.95rem;
}

.add-book-btn {
   background-color: #4e342e;
   color: white;
   border: none;
   padding: 0.6rem;
   font-size: 1rem;
   border-radius: 8px;
   cursor: pointer;
   gap: 0.5rem;
   transition: background-color 0.3s ease;
}
.add-book-btn:hover {
   background-color: #3e2723;
}

.search-container {
   margin-bottom: 1.5rem;
   display: flex;
   justify-content: space-between;
   align-items: center;
}
.search-container input {
   padding: 0.6rem;
   width: 100%;
   max-width: 540px;
   border-radius: 8px;
   border: 1px solid #ccc;
   font-size: 1rem;
}

.book-category {
   display: block;
   font-size: 0.9rem;
   color: gray;
}
.book-title-author {
   color: #4e342e;
   font-size: 1.1rem;
   margin-bottom: 0.3rem;
}
.book-title-author strong {
   font-weight: bold;
}
</style>
