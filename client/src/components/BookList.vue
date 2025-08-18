<template>
   <ul>
      <li v-for="book in books" :key="book._id">
         <div class="book-info">
            <div class="book-title-author">
               <strong>{{ book.title }}</strong> - {{ book.author }}
            </div>
            <div class="book-category">{{ book.category }}</div>
         </div>

         <div class="actions" v-if="isLoggedIn">
            <button @click="$emit('edit', book)">
               <span class="material-icons">edit</span>
            </button>
            <button @click="$emit('delete', book._id)">
               <span class="material-icons">delete</span>
            </button>
         </div>
      </li>
   </ul>
</template>

<script setup>
defineProps({
   books: {type: Array, default: () => []},
   isLoggedIn: {type: Boolean, default: false},
})
defineEmits(["edit", "delete"])
</script>

<style scoped>
ul {
   list-style: none;
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
   transition: transform 0.2s, box-shadow 0.2s;
}
li:hover {
   transform: translateY(-2px);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.book-title-author {
   color: #4e342e;
   font-size: 1.1rem;
   margin-bottom: 0.3rem;
}
.book-title-author strong {
   font-weight: 700;
}
.book-category {
   display: block;
   font-size: 0.9rem;
   color: gray;
}
.actions button {
   background: transparent;
   border: none;
   cursor: pointer;
   padding: 0.5rem;
}
.actions button:hover {
   background: #f0e6e2;
}
</style>
