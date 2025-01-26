const updateController = (Model) => {
  return async (req, res) => {
    const { id, newName } = req.params;

    console.log("id, newName", id, newName);

    try {
      const updateUser = await Model.findByIdAndUpdate(id, { columnName: newName }, {
        new: true,
      });
      if (!updateUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = updateController;
