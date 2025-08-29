import Board from "../models/Board.js";
import Column from "../models/Column.js";
export const createBoard = async (req, res) => {
    const { title } = req.body;
    const board = await Board.create({ title, owner: req.user.id, members: [req.user.id] });
    // default columns
    const names = ["To Do", "In Progress", "Done"];
    const cols = await Column.insertMany(names.map(n => ({ title: n, board: board._id, taskOrder: [] })));
    board.columns = cols.map(c => c._id);
    await board.save();
    res.status(201).json(board);
};
export const listBoards = async (req, res) => {
    const boards = await Board.find({ members: req.user.id }).populate("columns");
    res.json(boards);
};
export const inviteMember = async (req, res) => {
    const { boardId, userId } = req.body;
    const board = await Board.findById(boardId);
    if (!board)
        return res.status(404).json({ message: "Board not found" });
    if (!board.members.includes(userId))
        board.members.push(userId);
    await board.save();
    res.json(board);
};
