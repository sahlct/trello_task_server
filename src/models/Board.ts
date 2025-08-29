import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBoard extends Document {
  title: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  columns: Types.ObjectId[];
}

const BoardSchema = new Schema<IBoard>({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  columns: [{ type: Schema.Types.ObjectId, ref: "Column" }]
}, { timestamps: true });

export default mongoose.model<IBoard>("Board", BoardSchema);
