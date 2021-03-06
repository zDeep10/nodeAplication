const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// DB CONNECTION AND CONFIG

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection has been established successfully.");
});

const { Todo, User } = require("./models/Todo");

// REQUESTS

// ! GET METHOD

// * TODO
app.get("/todos/:id", async (req, res) => {
  const taskID = req.params.id;
  const todos = await Todo.find({ userID: taskID });

  res.json(todos);
});

// * USUARIO
app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

// ! POST METHOD

// * USUARIO
app.post("/users/new", async (req, res) => {
  const newUser = await new User(req.body);

  newUser.save();

  return res.json(newUser);
});

// * TODO
app.post("/todos/new", async (req, res) => {
  const task = await new Todo({
    text: req.body.text,
    userID: req.body.userID,
  });

  task.save();

  return res.json(task);
});

// ! DELETE METHOD

// * TODO
app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndRemove(req.params.id);

  return res.status(200).send(result);
});

app.delete("/deleteAll/todo/:id", async (req, res) => {
  const result = await Todo.deleteMany({
    userID: req.params.id,
    complete: false,
  });

  return res.status(200).send(result);
});

app.delete("/deleteAll/done/:id", async (req, res) => {
  const result = await Todo.deleteMany({
    userID: req.params.id,
    complete: true,
  });

  return res.status(200).send(result);
});

// ! UPDATE METHOD

app.put("/todos/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.put("/todos/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;

  todo.save();

  res.json(todo);
});

// LISTEN

app.listen(process.env.PORT || 3001, () =>
  console.log("Server started on port 3001")
);
