import db from "../db/db.js"
import { validateMascota, validateUbicacion } from "../validations/schemas.js";

export const getMascotas = async (user_id) => {
    try {
        const query = `
            SELECT 
                m.*,
                um.lat,
                um.lng,
                um.timestamp AS ultima_actualizacion
            FROM mascotas m
            LEFT JOIN (
                SELECT 
                    id_mascota, 
                    lat, 
                    lng, 
                    timestamp,
                    ROW_NUMBER() OVER (PARTITION BY id_mascota ORDER BY timestamp DESC) AS rn
                FROM ubicacion_mascotas
            ) um ON m.id = um.id_mascota AND um.rn = 1
            WHERE m.user_id = ?
        `;

        const [mascotas] = await db.query(query, [user_id]);

        return {
            statusCode: 200,
            message: "Mascotas con ubicación obtenidas",
            data: mascotas
        }
    } catch (err) {
        console.error('Error en getMascotas:', err);
        throw {
            message: "Error al obtener las mascotas",
            statusCode: 500,
            error: err.message
        };
    }
};

export const getMascotasPorId = async (id) => {
    try {
        const query = 'SELECT * FROM mascotas WHERE id = ?'

        const [mascotas] = await db.query(query, [id]);

        return {
            statusCode: 200,
            message: "Mascota obtenida exitosamente",
            data: mascotas
        };
    } catch (err) {
        console.error('Error en getMascotas:', err);
        throw {
            message: "Error al obtener la mascota",
            statusCode: 500,
            error: err.message
        };
    }
};

export const createMascota = async (data) => {
    const { error } = validateMascota(data);
    if (error) throw { message: error.details[0].message, statusCode: 400 };

    const { nombre, edad, raza, peso, tipo, user_id } = data;

    try {

        const query = `
            INSERT INTO mascotas 
            (nombre, edad, raza, peso, tipo, user_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const [result] = await db.query(query, [
            nombre,
            edad,
            raza,
            peso,
            tipo,
            user_id
        ]);

        // Obtener la mascota recién creada
        const [mascotaCreada] = await db.query(
            'SELECT * FROM mascotas WHERE id = ?',
            [result.insertId]
        );

        return {
            statusCode: 201,
            message: "Mascota creada exitosamente",
            data: mascotaCreada[0]
        };

    } catch (err) {
        console.error('Error en createMascota:', err);

        // Si ya es un error nuestro (con statusCode), lo re-lanzamos
        if (err.statusCode) {
            throw err;
        }

        // Manejo específico para errores de duplicado o FK
        if (err.code === 'ER_DUP_ENTRY') {
            throw {
                statusCode: 409,
                message: "Conflicto: posible duplicado",
                error: err.message
            };
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            throw {
                statusCode: 404,
                message: "El usuario especificado no existe",
                error: err.message
            };
        }

        // Error genérico
        throw {
            statusCode: 500,
            message: "Error al crear la mascota",
            error: err.message
        };
    }
};

export const getMascotaLocation = async (data) => {

    const { id_mascota } = data;
    
    console.log('hola')
    try {
        // 1. Verificar que exista la mascota
        const [mascota] = await db.query(
            'SELECT id FROM mascotas WHERE id = ?', 
            [id_mascota]
        );

        if (!mascota.length) {
            throw {
                statusCode: 404,
                message: "Mascota no encontrada"
            };
        }

        // 2. Obtener la ubicación
        const [ubicacion] = await db.query(
            'SELECT * FROM ubicacion_mascotas WHERE id_mascota = ? ORDER BY timestamp DESC LIMIT 1',
            [id_mascota]
        );

        if (!ubicacion.length) {
            return {
                statusCode: 200,
                message: "La mascota no tiene ubicaciones registradas",
                data: null
            };
        }

        return {
            statusCode: 200,
            message: "Ubicación obtenida exitosamente",
            data: ubicacion
        };

    } catch (err) {
        console.error('Error en getMascotaLocation:', err);
        
        if (err.statusCode) {
            throw err;
        }

        throw {
            statusCode: 500,
            message: "Error al obtener la ubicación",
            error: err.message
        };
    }
};

export const editMascotaLocation = async (data) => {
    // Validación con Joi
    const { error } = validateUbicacion(data);
    if (error) throw {
        message: error.details[0].message,
        statusCode: 400,
        details: error.details
    };

    const { id_mascota, lat, lng } = data;

    try {
        // 1. Verificar que exista la mascota
        const [mascota] = await db.query(
            'SELECT id FROM mascotas WHERE id = ?',
            [id_mascota]
        );

        if (!mascota.length) {
            throw {
                statusCode: 404,
                message: "Mascota no encontrada"
            };
        }

        // 2. Actualizar o insertar ubicación
        // Primero intentamos actualizar
        const updateQuery = `
            UPDATE ubicacion_mascotas 
            SET lat = ?, lng = ?, timestamp = NOW()
            WHERE id_mascota = ?
        `;
        
        const [updateResult] = await db.query(updateQuery, [lat, lng, id_mascota]);

        // Si no se actualizó ningún registro, insertamos uno nuevo
        if (updateResult.affectedRows === 0) {
            const insertQuery = `
                INSERT INTO ubicacion_mascotas 
                (id_mascota, lat, lng, timestamp)
                VALUES (?, ?, ?, NOW())
            `;
            await db.query(insertQuery, [id_mascota, lat, lng]);
        }

        // 3. Obtener el registro actualizado/creado
        const [ubicacionActual] = await db.query(
            'SELECT * FROM ubicacion_mascotas WHERE id_mascota = ?',
            [id_mascota]
        );

        return {
            statusCode: 200,
            message: "Ubicación actualizada exitosamente",
            data: ubicacionActual[0]
        };

    } catch (err) {
        console.error('Error en editMascotaLocation:', err);

        if (err.statusCode) {
            throw err;
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            throw {
                statusCode: 404,
                message: "La mascota especificada no existe",
                error: err.message
            };
        }

        throw {
            statusCode: 500,
            message: "Error al actualizar la ubicación",
            error: err.message
        };
    }
};