const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchemas");

const Todo = new mongoose.model("Todo", todoSchema);

// get all the todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find(req.body);
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// get all active todos using custom method
router.get("/active", async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side erroreeee!",
      message: error,
    });
  }
});

// get all todos whose title includes js using custom static method
router.get("/js", async (req, res) => {
  try {
    const data = await Todo.findByJS();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an server side error!",
      message: err,
    });
  }
});

// get all todos by language using custom query helper
router.get("/language", async (req, res) => {
  try {
    const data = await Todo.find().byLanguage("js");
    res.status(200).json({
      message: "Search by language JS",
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an server side error!",
      message: err,
    });
  }
});

// get single todo by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// post todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// post multiple todos
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todos ware inserted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// put todo
router.put("/:id", async (req, res) => {
  try {
    const data = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Todo was updated successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// delete todo
router.delete("/:id", async (req, res) => {
  try {
    let data = await Todo.findByIdAndDelete(req.params.id).select({
      title: 0,
      description: 0,
      status: 0,
      date: 0,
    });
    res.status(200).json({
      success: true,
      message: "Todo was deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

module.exports = router;
