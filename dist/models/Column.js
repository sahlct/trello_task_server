import mongoose, { Schema } from "mongoose";
const ColumnSchema = new Schema({
    title: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    taskOrder: [{ type: Schema.Types.ObjectId, ref: "Task" }]
}, { timestamps: true });
export default mongoose.model("Column", ColumnSchema);
