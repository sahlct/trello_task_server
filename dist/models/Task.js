import mongoose, { Schema } from "mongoose";
const TaskSchema = new Schema({
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    column: { type: Schema.Types.ObjectId, ref: "Column", required: true },
    title: { type: String, required: true },
    description: String,
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    dueDate: Date,
    comments: [{
            user: { type: Schema.Types.ObjectId, ref: "User" },
            text: String,
            createdAt: { type: Date, default: Date.now }
        }]
}, { timestamps: true });
export default mongoose.model("Task", TaskSchema);
