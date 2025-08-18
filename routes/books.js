import express from "express";
const router = express.Router();
import {
  create,
  deleteBook,
  getById,
  get,
  update,
} from "../controllers/BookController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.get("/:id", getById);

router.get("/", get);

router.post("/create", authMiddleware, create);

router.put("/:id", authMiddleware, update);

router.delete("/:id", authMiddleware, deleteBook);

export default router;
