import Column from "../models/Column.js";
export const renameColumn = async (req, res) => {
    const { columnId } = req.params;
    const { title } = req.body;
    const col = await Column.findByIdAndUpdate(columnId, { title }, { new: true });
    res.json(col);
};
