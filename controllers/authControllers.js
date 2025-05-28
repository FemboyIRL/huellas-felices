import { loginUser, registerUser } from "../services/authService.js"

export const login_user = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body)
  try {
    const result = await loginUser({ email, password });
    const { statusCode, message, data, token } = result;
    res.status(statusCode).json({ message, data, token });
  } catch (err) {
    const { statusCode, message, data } = err;
    res.status(statusCode).json({ message, data });
    next(err);
  }
};

// Controlador para el registro
export const register_user = async (req, res, next) => {

  console.log(req.body)

  const { nombre, apellido, email, password } = req.body;

  try {
    const result = await registerUser({ nombre, apellido, email, password });
    const { statusCode, message, data, token } = result;
    res.status(statusCode).json({ message, data, token });
  } catch (err) {
    const { statusCode, message, data } = err;
    console.log(err)
    res.status(statusCode).json({ message, data });
    next(err);
  }
};