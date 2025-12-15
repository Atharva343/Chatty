import express from "express";
import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import dotenv, { parse } from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/soket.js";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
