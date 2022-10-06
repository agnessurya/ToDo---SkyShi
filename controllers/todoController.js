const { Activity, Todolist } = require("../models");

class TodoController {
  static async createTodos(req, res, next) {
    try {
      const { activityID } = req.params;
      const { title, priority, status } = req.body;
      const todos = await Todolist.create({
        activityID,
        title,
        priority,
        status,
      });
      if (todos.id) {
        res.status(201).json({
          success: true,
          message: "Success Create New Todolist",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getTodos(req, res, next) {
    try {
      const todos = await Todolist.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        success: true,
        message: "Success Get Todolists",
        data: todos,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTodosById(req, res, next) {
    try {
      const { id } = req.params;
      const todos = await Todolist.findByPk(+id);
      if (!todos.id) {
        throw { name: "DataNotFound" };
      }
      res.status(200).json({
        success: true,
        message: "Success Get Todolist By Id",
        data: todos,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTodosByActivityId(req, res, next) {
    try {
      const { activityID } = req.params;

      const activity = await Activity.findByPk(+activityID);

      if (!activity.id) {
        throw { name: "DataNotFound" };
      }
      let where = {
        activityID: activityID,
      };
      let order = [["id", "DESC"]];
      const { queryOrder, status } = req.query;
      if (queryOrder == "oldest") {
        order = [["createdAt", "DESC"]];
      }
      if (queryOrder == "newest") {
        order = [["createdAt", "ASC"]];
      }
      if (queryOrder == "AtoZ") {
        order = [["title", "ASC"]];
      }
      if (queryOrder == "ZtoA") {
        order = [["title", "DESC"]];
      }
      if (status) {
        where.status = status;
      }
      const todos = await Todolist.findAll({
        where,
        order,
      });

      res.status(200).json({
        success: true,
        message: "Success Get Todolist by activityId",
        data: todos,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateTodos(req, res, next) {
    try {
      const { id } = req.params;
      const { title, priority, status } = req.body;
      const todos = await Todolist.findByPk(+id);

      if (!todos.title) {
        throw { name: "DataNotFound" };
      }
      const update = await Todolist.update(
        {
          title,
          priority,
          status,
        },
        {
          where: {
            id,
          },
        }
      );
      if ((update[0] = 1)) {
        res.status(200).json({
          success: true,
          message: "Success Update Todos",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteTodos(req, res, next) {
    try {
      const { id } = req.params;
      const todos = await Todolist.findByPk(+id);
      if (!todos.title) {
        throw { name: "DataNotFound" };
      }
      if (todos.status == "On Progress") {
        throw { name: "NotComplete" };
      }
      const deleteActivity = await Todolist.destroy({
        where: { id },
      });
      res.status(200).json({
        success: true,
        message: "Success Delete Todos",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodoController;
