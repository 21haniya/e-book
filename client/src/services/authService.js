import {api} from "@/api/api"

const register = (payload) => api.post("/auth/register", payload).then((r) => r.data)

const login = (payload) => api.post("/auth/login", payload).then((r) => r.data)

export default {register, login}
