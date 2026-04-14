const mongoose = require("mongoose");

//creating todo-list schema.
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const TodoModel = mongoose.model("Todo_Lists", todoSchema);

module.exports = TodoModel;

