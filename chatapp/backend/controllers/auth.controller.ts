import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

/************************************************************************************************* SIGNUP */
export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    /************************************************************************************************* get user and validate */
    const { fullName, username, password, confirmPass, gender } = req.body;
    if (!fullName || !username || !password || !confirmPass) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPass) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    /************************************************************************************************* check unique user */
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    /************************************************************************************************* hash the pass */
    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    /************************************************************************************************* Genarate profile pic */
    const picUrl = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    /************************************************************************************************* Create new user */
    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPass,
        gender,
        profilePic: picUrl,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);
      return res.status(200).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({ error: "invalid user" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
};
export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
