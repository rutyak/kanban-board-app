const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  assignedTo: { type: String, required: true },
});

const columnSchema = new Schema({
  columnName: { type: String, required: true },
  tasks: [taskSchema],
});

const Column = mongoose.model("Column", columnSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = { Column, Task };
