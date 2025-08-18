import BookModel from "../models/Book.js"

const bookRepository = {
   async getById(bookId) {
      return BookModel.findById(bookId)
   },

   async get(filter) {
      return BookModel.find(filter).select("-__v")
   },

   async create(newBook) {
      return BookModel.create(newBook)
   },

   async update(id, update) {
      return BookModel.findByIdAndUpdate(id, update)
   },

   async deleteBook(id) {
      return BookModel.findByIdAndDelete(id)
   },
}

export default bookRepository
