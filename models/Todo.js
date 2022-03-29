const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    require: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const UserSchema = new Schema({
  user: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("UserInfo", UserSchema);

const Todo = mongoose.model("Task", TodoSchema);

const schema = {
  User,
  Todo,
};

module.exports = schema;
