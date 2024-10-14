import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (id: string, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // prevent xss cross site scripting attacks
    sameSite: "strict", // CSRF attacks cross site request forgery
    secure: process.env.NODE_ENV === "production", //HTTPS only
  });

  return token;
};
