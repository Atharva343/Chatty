import express from "express";
import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import dotenv, { parse } from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/soket.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/__test__", (req, res) => {
  res.send("SERVER IS RUNNING");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const frontendPath = path.join(__dirname, "..", "..", "Frontend", "dist");

app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
