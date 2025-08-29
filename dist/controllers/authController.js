import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const register = async (req, res) => {
    const { email, password, name } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
        return res.status(400).json({ message: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    res.status(201).json({ id: user._id, email: user.email, name: user.name });
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
};
export const me = async (_req, res) => {
    res.json({ ok: true });
};
export const logout = async (_req, res) => {
    res.clearCookie("token");
    res.json({ ok: true });
};
