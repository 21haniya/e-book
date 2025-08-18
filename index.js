import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import bookRoutes from "./routes/books.js"
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./db.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

await connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`)
})
