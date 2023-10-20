import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    res
      .status(201)
      .send({ success: true, message: "L'utente è stato creato con successo" });
  } catch (error) {
    next(errorHandler(error.statusCode, error.message));
  }
};
