<template>
   <div class="register-page">
      <form @submit.prevent="registerUser">
         <h2>Kayıt Ol</h2>
         <input v-model="username" type="text" placeholder="Kullanıcı Adı" />
         <input v-model="email" type="email" placeholder="E-posta" />
         <input v-model="password" type="password" placeholder="Şifre" />
         <button type="submit" :disabled="!username || !email || !password" class="register-btn">Kayıt Ol</button>
         <p v-if="successMsg">{{ successMsg }}</p>
      </form>
   </div>
</template>

<script setup>
import {ref} from "vue"
import {AuthService} from "@/services"

const username = ref("")
const email = ref("")
const password = ref("")
const successMsg = ref("")

const registerUser = async () => {
   try {
      await AuthService.register({
         username: username.value,
         email: email.value,
         password: password.value,
      })
      successMsg.value = "Kayıt başarılı, şimdi giriş yapabilirsiniz."
      username.value = email.value = password.value = ""
   } catch (err) {
      const data = err.response?.data

      // Çakışma (409) gibi tekil hata
      if (err.response?.status === 409 && data?.error) {
         successMsg.value = data.error
         return
      }

      // ✅ Doğrulama hataları: { errors: { field: "mesaj" } }
      if (data?.errors && typeof data.errors === "object") {
         // En basit: tüm mesajları üstte birleştirerek göster
         successMsg.value = Object.values(data.errors).join(" • ")
         return
      }

      // Diğer durumlar
      successMsg.value = data?.message || "Bir hata oluştu."
   }
}
</script>

<style scoped>
.register-btn[disabled] {
   opacity: 0.75; /* Şeffaflık */
   cursor: not-allowed; /* Tıklanamaz imleç */
}
</style>
