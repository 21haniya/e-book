<template>
  <div v-if="modelValue" class="modal-overlay">
    <div class="modal">
      <button class="close-modal" @click="$emit('update:modelValue', false)">
        <span class="material-icons">close</span>
      </button>

      <h3>{{ isEdit ? "Kitap Düzenle" : "Kitap Ekle" }}</h3>

      <input
        v-model="localBook.title"
        type="text"
        placeholder="Kitap Başlığı"
      />
      <input v-model="localBook.author" type="text" placeholder="Yazar Adı" />

      <select v-model="localBook.category" class="category-select">
        <option value="">Kategori Seçiniz</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>

      <button @click="onSubmit">
        {{ isEdit ? "Güncelle" : "Ekle" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive, watch} from "vue"

// Props
const props = defineProps({
  modelValue: {type: Boolean, default: false}, // v-model görünürlük
  book: {
    type: Object,
    default: () => ({title: "", author: "", category: ""}),
  },
  categories: {type: Array, default: () => []},
  mode: {type: String, default: "add"}, // 'add' | 'edit'
})

// Emits
const emit = defineEmits(["update:modelValue", "save"])

// İçeride kopya state (prop’u doğrudan mutetmemek için)
const localBook = reactive({
  title: "",
  author: "",
  category: "",
  _id: undefined,
})

watch(
  () => props.book,
  (val) => {
    Object.assign(localBook, val || {title: "", author: "", category: ""})
  },
  {immediate: true},
)

const isEdit = computed(() => props.mode === "edit")

const onSubmit = () => {
  // Kaydetme isteğini yukarıya fırlat
  emit("save", {...localBook})
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  position: relative;
  text-align: center;
}
.close-modal {
  position: absolute;
  top: 0;
  right: 10px;
  background: red;
  color: #fff;
  font-size: 1.5rem;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal input,
.category-select {
  padding: 0.75rem;
  margin: 0.5rem 0;
  width: 90%;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.modal button {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  background: #4e342e;
  color: #fff;
}
.modal button:hover {
  background: #3e2723;
}
.category-select:focus {
  outline: none;
  border-color: #4e342e;
  box-shadow: 0 0 0 2px rgba(78, 52, 46, 0.2);
}
</style>
