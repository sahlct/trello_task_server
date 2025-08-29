import { Response } from "express";
import Board from "../models/Board.js";
import Column from "../models/Column.js";
import { AuthRequest } from "../types.js";

export const createBoard = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  const board = await Board.create({ title, owner: req.user!.id, members: [req.user!.id] });
  // default columns
  const names = ["To Do","In Progress","Done"];
  const cols = await Column.insertMany(names.map(n => ({ title: n, board: board._id, taskOrder: [] })));
  board.columns = cols.map(c => c._id);
  await board.save();
  res.status(201).json(board);
};

export const listBoards = async (req: AuthRequest, res: Response) => {
  const boards = await Board.find({ members: req.user!.id }).populate("columns");
  res.json(boards);
};

export const inviteMember = async (req: AuthRequest, res: Response) => {
  const { boardId, userId } = req.body;
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });
  if (!board.members.includes(userId)) board.members.push(userId);
  await board.save();
  res.json(board);
};
