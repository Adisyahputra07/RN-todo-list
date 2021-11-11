const { Todos } = require("../../models");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todos.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.send({
      status: "success",
      data: {
        todos,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "Server error",
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "Server error",
    });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const data = req.body;
    const newTodos = await Todos.create({
      title: req.body.title,
      status: "Not done",
    });

    let todo = await Todos.findOne({
      where: { id: newTodos.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    todo = JSON.parse(JSON.stringify(todo));
    res.send({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "server error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Todos.update(
      {
        status: req.body.status,
      },
      {
        where: { id },
      }
    );

    let todo = await Todos.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    todo = JSON.parse(JSON.stringify(todo));
    res.send({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "server error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todos.destroy({
      where: { id },
    });
    res.send({
      status: "success",
      data: {
        id: `${id}`,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "server error",
    });
  }
};
