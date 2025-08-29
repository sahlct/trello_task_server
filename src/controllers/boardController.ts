import { Response } from "express";
import mongoose from "mongoose";
import Board from "../models/Board.js";
import Column from "../models/Column.js";
import { AuthRequest } from "../types.js";

export const createBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { title } = req.body;

    // create board with current user as owner and member
    const board = await Board.create({
      title,
      owner: req.user!.id,
      members: [req.user!.id],
    });

    // default columns
    const names = ["To Do", "In Progress", "Done"];
    const cols = await Column.insertMany(
      names.map((n) => ({
        title: n,
        board: board._id,
        taskOrder: [],
      }))
    );

    // assign columns to board (fix typing issue here)
    board.columns = cols.map((c) => c._id as mongoose.Types.ObjectId);
    await board.save();

    res.status(201).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating board" });
  }
};

export const listBoards = async (req: AuthRequest, res: Response) => {
  try {
    const boards = await Board.find({ members: req.user!.id }).populate("columns");
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching boards" });
  }
};

export const inviteMember = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId, userId } = req.body;
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    if (!board.members.includes(userId)) {
      board.members.push(userId);
    }

    await board.save();
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error inviting member" });
  }
};
