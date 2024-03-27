const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Task = require("./models/task");

mongoose
  .connect("mongodb://127.0.0.1:27017/task")
  .then(() => {
    console.log("MONGOOSE CONNECTED");
  })
  .catch((err) => {
    console.log("MONGOOSE ERROR!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Retrieve and render tasks
app.get("/", async (req, res) => {
  const incompletedTasks = await Task.find({ completed: false });
  const completedTasks = await Task.find({ completed: true });

  res.render("tasks/index", { incompletedTasks, completedTasks });
});

// Create new task
app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.redirect(`/`);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect("/");
});

// Toggle task status
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  // const { id } = req.params;
  const product = await Task.findById(id);

  const task = await Task.findByIdAndUpdate(
    id,
    { completed: !product.completed },
    {
      runValidators: true,
      new: true,
    }
  );

  res.redirect(`/`);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING PORT 3000");
});
