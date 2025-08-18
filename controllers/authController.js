import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/authMiddleware.js";
import authService from "../services/authService.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await authService.findUsername(username);
    if (existing)
      return res.status(409).json({ error: "Kullanıcı zaten kayıtlı!" });

    const existingEmail = await authService.findEmail(email);
    if (existingEmail)
      return res
        .status(409)
        .json({ error: "Bu e-posta ile kayıtlı bir kullanıcı var!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authService.register({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Kayıt başarılı :)", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Bir hata oluştu", message: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.login(username);
    if (!user) return res.status(401).json({ error: "Geçersiz kullanıcı!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Geçersiz şifre!" });

    const token = await generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Bir hata oluştu", message: err.message });
  }
};
