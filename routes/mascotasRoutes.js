import express from 'express'
import { get_mascotas, create_mascota, get_mascota_id, editar_ubicacion_mascota, get_ubicacion_mascota } from '../controllers/mascotasControllers.js'

const router = express.Router()

router.get('/', get_mascotas)

router.post('/', create_mascota)

router.get('/:id', get_mascota_id)

router.post('/ubicacion/', editar_ubicacion_mascota)

export default router