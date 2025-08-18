import bookService from "../services/bookService.js";

export const create = async (req, res) => {
  try {
    const { title, author, category } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Kitap başlığı (title) zorunludur." });
    }

    const newBook = await bookService.createBook({ title, author, category });

    res
      .status(201)
      .json({ message: "Kitap başarıyla eklendi.", book: newBook });
  } catch (error) {
    console.error("Gerçek Hata:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export const getById = async (req, res) => {
  try {
    const book = await bookService.getById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const filter = {};
    if (req.query.title) filter.title = req.query.title;
    if (req.query.category) filter.category = req.query.category;

    const books = await bookService.getBook(filter);

    if (!books) return res.status(404).json({ error: "Kitap bulunamadı" });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).send("Hata oluştu");
  }
};

export const update = async (req, res) => {
  try {
    var updatedBook = await bookService.updateBook(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id);

    if (!book) return res.status(404).json({ error: "Ürün bulunamadı" });
    res.json({ message: "Silindi", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
