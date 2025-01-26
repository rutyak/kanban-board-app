const { Column } = require("../model/dashboardSchema");

const deleteController = (Model) => {
  return async (req, res) => {
    const { id } = req.params;

    console.log("useID: ",id);
    
    try {
      const deletedUser = await Model.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const deleteTaskController = (Model) => {
  return async (req, res) => {
    const { columnId, taskId } = req.params;

    console.log("columnId, taskId", columnId, taskId);
    
    try {
      const column = await Column.findById(columnId);

      if (!column) {
        return res.status(404).json({ message: "Column not found" });
      }

      const updatedTasks = column.tasks.filter((task) => task.id.toString() !== taskId);
      
      column.tasks = updatedTasks;
      await column.save();

      res.status(200).json({ message: "Task deleted successfully", tasks: column.tasks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { deleteController, deleteTaskController };
