import { getMascotas, createMascota, getMascotasPorId, editMascotaLocation, getMascotaLocation } from "../services/mascotasService.js"

//Controller que devuelve todas las mascotas del usuario
export const get_mascotas = async (req, res, next) => {
  const { user_id } = req.query

  console.log(user_id)
  try {
    const result = await getMascotas(user_id);
    const { statusCode, message, data } = result;
    console.log(data)
    res.status(statusCode).json({ message, data });

  } catch (err) {
    const { statusCode, message, data } = err;
    console.log(err)
    res.status(statusCode).json({ message, data });
    next(err);
  }
};

// Controlador para el registro
export const create_mascota = async (req, res, next) => {
  const { nombre, edad, raza, peso, tipo, user_id } = req.body;
  try {
    const result = await createMascota({ nombre, edad, raza, peso, tipo, user_id});
    const { statusCode, message, data } = result;
    res.status(statusCode).json({ message, data });
  } catch (err) {
    const { statusCode, message, data } = err;
    res.status(statusCode).json({ message, data });
    next(err);
  }
};

//Devuelve los datos de una mascota en base a su id

export const get_mascota_id = async (req,res,next) => {
    const { id } = req.params
    try {
        const result = await getMascotasPorId(id)
        const {statusCode, message, data} = result
        res.status(statusCode).json({message,data})
    } catch (err){
        const { statusCode, message, data } = err;
        console.log(err)
        res.status(statusCode).json({ message, data });
        next(err);
    }
}

export const get_ubicacion_mascota = async (req,res,next) => {
    const { id_mascota } = req.body
    console.log(id_mascota)
    try {
        const result = await getMascotaLocation({ id_mascota })
        const {statusCode, message, data} = result
        res.status(statusCode).json({message,data})
    } catch (err){
        const { statusCode, message, data } = err;
        console.log(err)
        res.status(statusCode).json({ message, data });
        next(err);
    }
}

export const editar_ubicacion_mascota = async (req,res,next) => {
    const { id_mascota, lat, lng } = req.body
    
    try {
        const result = await editMascotaLocation({ id_mascota, lat, lng})
        const {statusCode, message, data} = result
        res.status(statusCode).json({message,data})
    } catch (err){
        const { statusCode, message, data } = err;
        console.log(err)
        res.status(statusCode).json({ message, data });
        next(err);
    }
}