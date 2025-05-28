import express from "express";
import authRoutes from './authRoutes.js';
import mascotasRoutes from './mascotasRoutes.js'

const router = express.Router()

router.use("/api/v1/auth", authRoutes)
router.use("/api/v1/mascotas", mascotasRoutes)

export default router;