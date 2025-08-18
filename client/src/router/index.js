import {createRouter, createWebHistory} from "vue-router"
import Register from "../pages/auth/Register.vue"
import Login from "../pages/auth/Login.vue"
import Books from "../pages/Books.vue"

const routes = [
  {path: "/register", component: Register},
  {path: "/login", component: Login},
  {path: "/books", component: Books},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
