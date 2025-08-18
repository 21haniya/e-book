// src/store/auth.js
import {reactive} from "vue"

export const auth = reactive({
  isLoggedIn: !!localStorage.getItem("token"),
  username: localStorage.getItem("username") || "",
})

export function login(username, token) {
  localStorage.setItem("token", token)
  localStorage.setItem("username", username)
  auth.isLoggedIn = true
  auth.username = username
}

export function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  auth.isLoggedIn = false
  auth.username = ""
}
