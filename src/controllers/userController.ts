import { Request, Response } from "express";
import User from "../models/User.js";
import Board from "../models/Board.js";

// GET /api/users?boardId=xyz - list users in a board
export const listUsers = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.query;
    if (!boardId) return res.status(400).json({ message: "boardId required" });

    // find users who are members of this board
    const board = await Board.findById(boardId).populate("members", "_id name email");
    if (!board) return res.status(404).json({ message: "Board not found" });

    res.json(board.members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
