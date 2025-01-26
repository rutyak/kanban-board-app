const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter");
const taskRouter = require("./router/taskRouter");
const columnRouter = require("./router/columnRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const url = process.env.MongoDB_url;

const corsOption = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connection established...");
  })
  .catch((error) => {
    console.error("Error in connection...", error);
  });

app.use(authRouter);
app.use(taskRouter);
app.use(columnRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
