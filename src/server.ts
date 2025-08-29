import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import boardRoutes from "./routes/boards.js";
import columnRoutes from "./routes/columns.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/user.js";
import { authSocket } from "./utils/authSocket.js";

const app = express();
app.use(express.json());
app.use(cookieParser());



const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://trello-task-client-e6o1.vercel.app";
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

app.get("/", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// HTTP & Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN, credentials: true }
});

io.use(authSocket);

io.on("connection", (socket) => {
  // join a board room
  socket.on("joinBoard", (boardId: string) => {
    socket.join(boardId);
  });

  // broadcast task create/update/move
  socket.on("taskCreated", (payload) => {
    io.to(payload.boardId).emit("taskCreated", payload);
  });
  socket.on("taskUpdated", (payload) => {
    io.to(payload.boardId).emit("taskUpdated", payload);
  });
  socket.on("taskMoved", (payload) => {
    io.to(payload.boardId).emit("taskMoved", payload);
  });
  socket.on("columnUpdated", (payload) => {
    io.to(payload.boardId).emit("columnUpdated", payload);
  });
});

const PORT = process.env.PORT || 5001;

async function start() {
  const MONGO_URI = process.env.MONGO_URI as string;
  await mongoose.connect(MONGO_URI);
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}
start().catch((e) => {
  console.error(e);
  process.exit(1);
});
