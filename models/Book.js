import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    category: String,
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
