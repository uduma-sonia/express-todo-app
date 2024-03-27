const mongoose = require("mongoose");
const Task = require("./models/task");

mongoose
  .connect("mongodb://127.0.0.1:27017/task")
  .then(() => {
    console.log("MONGOOSE CONNECTED");
  })
  .catch((err) => {
    console.log("MONGOOSE ERROR");
    console.log(err);
  });

const task = new Task({
  title: "Learn HTML and CSS",
  completed: true,
});

task
  .save()
  .then((p) => console.log(p))
  .catch((err) => console.log(err));
