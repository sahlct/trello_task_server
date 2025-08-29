// controllers/columnController.ts
import Column from "../models/Column.js";
import { AuthRequest } from "../types.js";
import { Response } from "express";

export const createColumn = async (req: AuthRequest, res: Response) => {
  const { boardId, title } = req.body;
  const col = await Column.create({ board: boardId, title, taskOrder: [] });
  res.json(col);
};

// Get columns by boardId
export const listColumns = async (req: AuthRequest, res: Response) => {
  const { boardId } = req.query;

  if (!boardId) return res.status(400).json({ message: "boardId is required" });

  try {
    const columns = await Column.find({ board: boardId.toString() }).sort({ createdAt: 1 }); // optional sort
    res.json(columns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch columns" });
  }
};


export const renameColumn = async (req: AuthRequest, res: Response) => {
  const { columnId } = req.params;
  const { title } = req.body;
  const col = await Column.findByIdAndUpdate(columnId, { title }, { new: true });
  res.json(col);
};

export const deleteColumn = async (req: AuthRequest, res: Response) => {
  const { columnId } = req.params;
  await Column.findByIdAndDelete(columnId);
  res.json({ success: true });
};
