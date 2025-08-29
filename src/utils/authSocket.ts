import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

export function authSocket(socket: Socket, next: (err?: any) => void) {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token"));
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (e) {
    next(new Error("Invalid token"));
  }
}
