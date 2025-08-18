
import bookRepository from '../repositories/bookRepository.js';

const bookService = {
    async getById (bookId) {
        const book = await bookRepository.getById(bookId);
        if (!book) throw new Error('book not found');
        return book;
    },

    async getBook (filter){
        const book = await bookRepository.get(filter);
        if (!book) throw new Error('book not found');
        return book;
    }, 

    async createBook(newBook){
        const book = await bookRepository.create(newBook);
       
        return book;
    },

    async updateBook(id, update){
        const book = await bookRepository.update(id, update);
        if (!book) throw new Error('error');
        return book;
    },

    async deleteBook(id){
        const book = await bookRepository.deleteBook(id);
        if (!book) throw new Error('error');
        return book;
    }

}


export default bookService;