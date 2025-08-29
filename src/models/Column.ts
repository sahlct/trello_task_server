import mongoose, { Schema, Document, Types } from "mongoose";

export interface IColumn extends Document {
  title: string;
  board: Types.ObjectId;
  taskOrder: Types.ObjectId[];
}

const ColumnSchema = new Schema<IColumn>({
  title: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  taskOrder: [{ type: Schema.Types.ObjectId, ref: "Task" }]
}, { timestamps: true });

export default mongoose.model<IColumn>("Column", ColumnSchema);
