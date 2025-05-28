import { validateUser } from "../validations/schemas.js";
import db from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from 'crypto'

// Función para iniciar sesión
export const loginUser = async (params) => {
  // Validar los datos de entrada
  const { error } = validateUser(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { email, password } = params;

  try {
    // Buscar el usuario en la base de datos
    const query = "SELECT * FROM users WHERE email = ?";
    const [user] = await db.query(query, [email]);

    // Verificar si el usuario existe
    if (user.length < 1) {
      throw { message: "Wrong credentials, please try again", statusCode: 400 };
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      throw { message: "Wrong credentials, please try again", statusCode: 400 };
    }

    // Generar un token JWT
    const token = jwt.sign({ data: user }, "secret", { expiresIn: "1h" });

    // Devolver la respuesta exitosa
    return {
      statusCode: 200,
      message: "Logged in successfully",
      data: user,
      token,
    };
  } catch (err) {
    console.log(err)
    throw {
      message: err.message || "Something went wrong, please try again",
      statusCode: err.statusCode || 500,
    };
  }
};

// Función para registrar un usuario
export const registerUser = async (params) => {
  // Validar los datos de entrada
  const { error } = validateUser(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { nombre, apellido, email, password } = params;

  try {
    // Verificar si el correo electrónico ya está en uso
    const checkEmailQuery = "SELECT email FROM users WHERE email = ?";
    const [existingUser] = await db.query(checkEmailQuery, [email]);

    if (existingUser[0]) {
      throw {
        message: "Email address is in use, please try a different one",
        statusCode: 400,
      };
    }

    // Hashear la contraseña
    const saltRounds = Number(process.env.SALT_ROUNDS); // Número de rondas de hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generar un UUID
    const id = crypto.randomBytes(16).toString("hex");

    // Insertar el nuevo usuario en la base de datos
    const insertUserQuery =
      "INSERT INTO users (id, nombre, apellido, email, password) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(insertUserQuery, [
      id,
      nombre,
      apellido,
      email,
      hashedPassword,
    ]);

    const selectUserQuery = "SELECT id, nombre, apellido, email FROM users WHERE id = ?";
    const [userRows] = await db.query(selectUserQuery, [id]);

    if (userRows.length === 0) {
      throw new Error("User not found after insertion.");
    }

    const user = userRows[0];

    // Generar un token JWT con los datos del usuario
    const token = jwt.sign({ data: user }, "secret", { expiresIn: "1h" });

    // Devolver la respuesta exitosa
    return {
      message: "You have successfully registered.",
      data: user,
      token,
      statusCode: 200,
    };
  } catch (err) {
    throw {
      message: err.message || "Something went wrong, please try again",
      statusCode: err.statusCode || 500,
    };
  }
};