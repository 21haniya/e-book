import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
