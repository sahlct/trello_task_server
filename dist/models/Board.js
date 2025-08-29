import mongoose, { Schema } from "mongoose";
const BoardSchema = new Schema({
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    columns: [{ type: Schema.Types.ObjectId, ref: "Column" }]
}, { timestamps: true });
export default mongoose.model("Board", BoardSchema);
