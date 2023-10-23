import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "The credentials entered are not valid"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: userPassword, ...user } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ ...user, success: true, message: "Login successful" });
  } catch (error) {
    next(errorHandler(error.statusCode, error.message));
  }
};

export const googleAuth = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      const { password: userPassword, ...user } = validUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send({ ...user, success: true, message: "Login successful" });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: userPassword, ...user } = newUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send({ ...user, success: true, message: "Login successful" });
    }
  } catch (error) {
    next(errorHandler(error.statusCode, error.message));
  }
};
