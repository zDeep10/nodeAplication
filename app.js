const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// DB CONNECTION

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection has been established successfully.");
});

const { Todo, User } = require("./models/Todo");

// ! GET METHOD

// * TODO
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

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

// ! UPDATE METHOD

app.put("/todos/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

// listen

app.listen(process.env.PORT || 3001, () =>
  console.log("Server started on port 3001")
);
