import Task from "../models/Task.js";
import Column from "../models/Column.js";
export const createTask = async (req, res) => {
    const { boardId, columnId, title, description, assignee, dueDate } = req.body;
    const task = await Task.create({ board: boardId, column: columnId, title, description, assignee, dueDate });
    await Column.findByIdAndUpdate(columnId, { $push: { taskOrder: task._id } });
    res.status(201).json(task);
};
export const moveTask = async (req, res) => {
    const { taskId } = req.params;
    const { fromColumnId, toColumnId, toIndex } = req.body;
    // remove from old column
    await Column.findByIdAndUpdate(fromColumnId, { $pull: { taskOrder: taskId } });
    // add to new column at index
    const dest = await Column.findById(toColumnId);
    if (!dest)
        return res.status(404).json({ message: "Column not found" });
    const newOrder = dest.taskOrder.map(id => id.toString());
    newOrder.splice(toIndex, 0, taskId);
    dest.taskOrder = newOrder;
    await dest.save();
    // update task.column
    await Task.findByIdAndUpdate(taskId, { column: toColumnId });
    res.json({ ok: true });
};
export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.json(task);
};
export const commentOnTask = async (req, res) => {
    const { taskId } = req.params;
    const { text } = req.body;
    const task = await Task.findByIdAndUpdate(taskId, { $push: { comments: { user: req.user.id, text, createdAt: new Date() } } }, { new: true });
    res.json(task);
};
