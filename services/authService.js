import authRepository from "../repositories/authRepository.js";

const authService = {
  async findUsername(username) {
    const userName = await authRepository.findUsername(username);
    return userName;
  },

  async findEmail(email) {
    const eMail = await authRepository.findEmail(email);
    return eMail;
  },

  async register(username, email, password) {
    const newUser = await authRepository.register(username, email, password);
    return newUser;
  },

  async login(username) {
    const user = await authRepository.login(username);
    return user;
  },
};

export default authService;
