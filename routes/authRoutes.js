import express from 'express'
import { login_user, register_user } from '../controllers/authControllers.js'

const router = express.Router()

router.post('/login', login_user)

router.post('/register', register_user)

export default router