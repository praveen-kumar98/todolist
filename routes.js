const express = require("express");
const router = express.Router();
const Todo = require("./models/Todo");

router.post("/todos", async (req, res, next) => {
  const newTodo = new Todo({
    title: req.body.title,
  });
  try {
    const todo = await newTodo.save();
    return res.json(todo);
  } catch (err) {
    res.staus(500).json(err);
  }
});

router.get("/todos", async (_, res, next) => {
  try {
    const todos = await Todo.find({});
    return res.json(todos);
  } catch (err) {
    res.staus(500).json(err);
  }
});

router.put("/todo/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.title = req.body.title;
      await todo.save();
      return res.json(todo);
    }
    const err1 = new Error("Todo not found");
    err1.status = 400;
    return next(err1);
  } catch (err) {
    if (err.kind === "ObjectId") {
      const err1 = new Error("Todo not found");
      err.status = 400;
      return next(err1);
    }
    res.staus(500).json(err);
  }
});

router.delete("/todo/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      await todo.remove();
      return res.json({
        message: "Todo has been deleted",
      });
    }
    const err1 = new Error("Todo not found");
    err1.status = 400;
    return next(err1);
  } catch (err) {
    if (err.kind === "ObjectId") {
      const err1 = new Error("Todo not found");
      err.status = 400;
      return next(err1);
    }
    res.staus(500).json(err);
  }
});

module.exports = router;
