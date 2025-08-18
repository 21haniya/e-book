<template>
   <div class="login">
      <form @submit.prevent="loginUser">
         <h2>Giriş Yap</h2>
         <input v-model="username" placeholder="Kullanıcı Adı" />
         <input v-model="password" type="password" placeholder="Şifre" />
         <button type="submit" :disabled="!username || !password" class="login-btn">Giriş Yap</button>
         <p v-if="message" class="message">
            {{ message }}
         </p>
      </form>
   </div>
</template>

<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"
import {AuthService} from "@/services"
import {login as setAuth} from "@/store/auth"

const username = ref("")
const password = ref("")
const message = ref("")
const router = useRouter()

const loginUser = async () => {
   try {
      const {user, token} = await AuthService.login({
         username: username.value,
         password: password.value,
      })

      setAuth(user?.username || username.value, token)
      message.value = "Giriş başarılı :)"
      router.push("/books")
   } catch (err) {
      if (err.response?.status === 401) {
         message.value = err.response?.data?.error
      } else {
         message.value = "Beklenmeyen bir hata oluştu"
      }
   }
}
</script>

<style>
.login,
.register-page {
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   background: #fdfaf6;
   font-family: "Segoe UI", sans-serif;
}

.login-btn[disabled] {
   opacity: 0.75;
   cursor: not-allowed;
}
</style>
