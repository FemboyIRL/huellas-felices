import express from "express";
import cors from "cors";
import path from "path";
import indexRouter from './routes/index.js'
import logger from 'morgan'
import 'dotenv/config'

const app = express();

// Middlware
app.use(cors());
app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Router index
app.use("/", indexRouter)

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Health Check")
})

const PORT = process.env.PORT
const ENV = "DEV"

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} using ${ENV} env.`)
})