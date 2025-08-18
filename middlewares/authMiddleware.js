import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  return jwt.sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const tokenVerify = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Token doğrulama hatası:", error.message);
    return null;
  }
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = await tokenVerify(token);

  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Geçersiz ya da süresi dolmuş token" });
  }

  req.user = decoded;
  next();
};

export { generateToken, tokenVerify, authMiddleware };
