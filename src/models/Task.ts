import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  board: Types.ObjectId;
  column: Types.ObjectId;
  title: string;
  description?: string;
  assignee?: Types.ObjectId;
  dueDate?: Date;
  comments: { user: Types.ObjectId; text: string; createdAt: Date }[];
}

const TaskSchema = new Schema<ITask>({
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

export default mongoose.model<ITask>("Task", TaskSchema);
