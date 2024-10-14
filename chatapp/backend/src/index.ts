import express from "express";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json()); // for parsing JSON data
// app.use()
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(5000, () => console.log("alhamdulillah"));
