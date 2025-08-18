import UserModel from "../models/User.js";

const authRepository = {
  async findUsername(username) {
    return await UserModel.findOne({ username });
  },

  async findEmail(email) {
    return await UserModel.findOne({ email });
  },

  async register(userData) {
    return await UserModel.create(userData);
  },

  async login(username) {
    return await UserModel.findOne({ username });
  },
};

export default authRepository;
