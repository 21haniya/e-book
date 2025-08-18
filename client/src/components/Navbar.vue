<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="left">
      <RouterLink to="/books" class="brand">eBook</RouterLink>
    </div>

    <div class="right" v-if="!auth.isLoggedIn">
      <RouterLink to="/login" class="btn link">Giriş Yap</RouterLink>
      <RouterLink to="/register" class="btn primary">Kayıt Ol</RouterLink>
    </div>

    <div class="right" v-else>
      <span class="user">👋 {{ auth.username }}</span>
      <button class="btn link" @click="onLogout">Çıkış Yap</button>
    </div>
  </nav>
</template>

<script setup>
import {useRouter, RouterLink} from "vue-router"
import {auth, logout} from "../store/auth"

const router = useRouter()
function onLogout() {
  logout()
  router.push("/login")
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.brand {
  font-weight: 700;
}
.right {
  display: flex;
  gap: 10px;
  align-items: center;
}
.btn {
  border: none;
  background: transparent;
  padding: 8px 12px;
  cursor: pointer;
}
.btn.primary {
  background: #5c4033;
  color: #fff;
  border-radius: 6px;
}
.link {
  color: #5c4033;
}
.user {
  opacity: 0.8;
}
</style>
