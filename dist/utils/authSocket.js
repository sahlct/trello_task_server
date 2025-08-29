import jwt from "jsonwebtoken";
export function authSocket(socket, next) {
    const token = socket.handshake.auth?.token;
    if (!token)
        return next(new Error("No token"));
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (e) {
        next(new Error("Invalid token"));
    }
}
