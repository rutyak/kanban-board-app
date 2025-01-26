const { Column } = require("../model/dashboardSchema");

const createTaskController = (Model) => {
  return async (req, res) => {
    const { title, description, dueDate, assignedTo } = req.body;

    const { columnName } = req.params;

    console.log("columnName: ", columnName);

    try {

      if (!title || !description || !dueDate || !assignedTo) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const column = await Column.findOne({ columnName });

      if (!column) {
        return res.status(404).json({ message: "Column not found." });
      }

      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        assignedTo,
      };

      column.tasks.push(newTask);

      await column.save();

      res.status(201).json({ message: "Task added successfully.", task: newTask });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
};


const createColumnController = (Model) => {
  return async (req, res) => {
    const { columnName } = req.body;

    console.log("column name: ",columnName);

    try {
      if (!columnName) {
        return res.status(400).json({ message: "Column name is required." });
      }

      const existingColumn = await Model.findOne({ columnName });

      if (existingColumn) {
        return res.status(400).json({ message: "Column already exists." });
      }

      const newColumn = await Model.create({
        id: Date.now().toString(),
        columnName,
        tasks: [],
      });

      res.status(201).json({ message: "Column created successfully.", column: newColumn });
    } catch (error) {
      console.error("Error creating column:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
};

module.exports = { createTaskController, createColumnController };
