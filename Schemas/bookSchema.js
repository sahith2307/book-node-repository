const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true, min: 1, max: 200 },
  content: { type: String, required: true, min: 10 },
  genre: { type: String, required: true, min: 3 },
  description: { type: String, required: true, min: 10, max: 1000 },
  category: {
    type: String,
    required: true,
    enum: ["GENERAL", "PROFESSIONAL", "POLITICAL", "ENTERTAINMENT"],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  author: { type: String, ref: "users" },
  createdOn: { type: Date, required: true, default: Date.now },
});
module.exports = mongoose.model("notes", bookSchema);
