import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;