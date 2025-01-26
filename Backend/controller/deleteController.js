const { Column } = require("../model/dashboardSchema");
const mongoose = require("mongoose");

const deleteColumnController = (Model) => {
  return async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid column ID" });
    }

    try {
      const deletedColumn = await Model.findByIdAndDelete(id);

      if (!deletedColumn) {
        return res.status(404).json({ message: "Column not found" });
      }

      res.status(200).json({ message: "Column deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const deleteTaskController = (Model) => {
  return async (req, res) => {
    const { columnId, taskId } = req.params;

    console.log("columnId, taskId",columnId, taskId);
    
    try {
      const column = await Column.findById(columnId);

      if (!column) {
        return res.status(404).json({ message: "Column not found" });
      }

      const updatedTasks = column.tasks.filter(
        (task) => task._id.toString() !== taskId
      );

      if (updatedTasks.length === column.tasks.length) {
        return res.status(404).json({ message: "Task not found in column" });
      }

      column.tasks = updatedTasks;
      await column.save();

      res
        .status(200)
        .json({ message: "Task deleted successfully", tasks: column.tasks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { deleteColumnController, deleteTaskController };
