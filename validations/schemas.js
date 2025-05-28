import Joi from 'joi'


//Users
const userSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(100)
        .messages({
            'string.empty': 'El nombre es obligatorio',
            'string.min': 'El nombre debe tener al menos 2 caracteres',
            'string.max': 'El nombre no puede exceder los 100 caracteres'
        }),

    apellido: Joi.string()
        .min(2)
        .max(100)
        .messages({
            'string.empty': 'El apellido es obligatorio',
            'string.min': 'El apellido debe tener al menos 2 caracteres',
            'string.max': 'El apellido no puede exceder los 100 caracteres'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Debe proporcionar un email válido',
            'string.empty': 'El email es obligatorio'
        }),

    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'string.max': 'La contraseña no puede exceder los 30 caracteres',
            'string.pattern.base': 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
        })
});

//Mascotas
const mascotaSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El nombre de la mascota es obligatorio',
            'string.min': 'El nombre debe tener al menos 2 caracteres'
        }),

    edad: Joi.number()
        .integer()
        .min(0)
        .max(30)
        .required()
        .messages({
            'number.base': 'La edad debe ser un número',
            'number.min': 'La edad no puede ser negativa',
            'number.max': 'La edad no puede ser mayor a 30 años'
        }),

    raza: Joi.string()
        .min(2)
        .max(100)
        .messages({
            'string.min': 'La raza debe tener al menos 2 caracteres'
        }),

    peso: Joi.number()
        .precision(2)
        .min(0.1)
        .max(200)
        .required()
        .messages({
            'number.base': 'El peso debe ser un número',
            'number.min': 'El peso mínimo es 0.1 kg',
            'number.max': 'El peso máximo es 200 kg'
        }),

    tipo: Joi.string()
        .valid('Perro', 'Gato', 'Ave', 'Reptil', 'Roedor', 'Otro')
        .required()
        .messages({
            'any.only': 'El tipo de mascota no es válido',
            'string.empty': 'Debe especificar el tipo de mascota'
        }),

    user_id: Joi.string()
        .required()
        .messages({
            'string.guid': 'El ID de usuario debe ser un UUID válido',
            'string.empty': 'El ID de usuario es obligatorio'
        })
});

//Ubicacion Mascotas
const ubicacionMascotaSchema = Joi.object({
    id_mascota: Joi.string()
        .required()
        .messages({
            'string.guid': 'El ID de mascota debe ser un UUID válido',
            'string.empty': 'El ID de mascota es obligatorio'
        }),

    lat: Joi.number()
        .min(-90)
        .max(90)
        .required()
        .messages({
            'number.base': 'La latitud debe ser un número',
            'number.min': 'La latitud mínima es -90',
            'number.max': 'La latitud máxima es 90'
        }),

    lng: Joi.number()
        .min(-180)
        .max(180)
        .required()
        .messages({
            'number.base': 'La longitud debe ser un número',
            'number.min': 'La longitud mínima es -180',
            'number.max': 'La longitud máxima es 180'
        })
});
//Historial Medico
const historialMedicoSchema = Joi.object({
    id_mascota: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.guid': 'El ID de mascota debe ser un UUID válido',
            'string.empty': 'El ID de mascota es obligatorio'
        }),

    fecha: Joi.date()
        .max('now')
        .required()
        .messages({
            'date.base': 'La fecha debe ser válida',
            'date.max': 'La fecha no puede ser futura',
            'date.empty': 'La fecha es obligatoria'
        }),

    procedimiento: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            'string.empty': 'El procedimiento es obligatorio',
            'string.min': 'El procedimiento debe tener al menos 5 caracteres'
        }),

    notas: Joi.string()
        .max(1000)
        .allow('')
        .messages({
            'string.max': 'Las notas no pueden exceder los 1000 caracteres'
        })
});


export const validateUser = (userData) => {
    return userSchema.validate(userData, { abortEarly: false });
};

export const validateMascota = (mascotaData) => {
    return mascotaSchema.validate(mascotaData, { abortEarly: false });
};

export const validateHistorialMedico = (historialData) => {
    return historialMedicoSchema.validate(historialData, { abortEarly: false });
};

export const validateUbicacion = (ubicacionData) => {
    return ubicacionMascotaSchema.validate(ubicacionData, { abortEarly: false });
};