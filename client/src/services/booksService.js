import {api} from "@/api/api"

const list = () => api.get("/books").then((r) => r.data)
const create = (payload) =>
  api.post("/books/create", payload).then((r) => r.data)
const update = (id, payload) =>
  api.put(`/books/${id}`, payload).then((r) => r.data)
const remove = (id) => api.delete(`/books/${id}`).then((r) => r.data)

export default {list, create, update, remove}
