const { Activity, Todolist } = require("../models");

class ActivityController {
  static async createActivity(req, res, next) {
    try {
      const { title } = req.body;
      const activity = await Activity.create({ title });
      if (activity.id) {
        res.status(201).json({
          success: true,
          message: "Success Create New Activity",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getActivity(req, res, next) {
    try {
      const activity = await Activity.findAll({
        order: [["createdAt", "DESC"]],
        attributes: ["title", "createdAt"],
        include: {
          model: Todolist,
          attributes: ["title"],
        },
      });

      res.status(200).json({
        success: true,
        message: "Success Get Activities",
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getActivityById(req, res, next) {
    try {
      const { id } = req.params;
      const activity = await Activity.findByPk(+id);
      if (!activity.id) {
        throw { name: "DataNotFound" };
      }
      res.status(200).json({
        success: true,
        message: "Success Get Activities By Id",
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateActivity(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const activity = await Activity.findByPk(+id);
      if (!activity.id) {
        throw { name: "DataNotFound" };
      }
      const update = await Activity.update(
        {
          title,
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
          message: "Success Update Activity",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteActivity(req, res, next) {
    try {
      const { id } = req.params;
      const activity = await Activity.findByPk(+id);
      if (!activity.id) {
        throw { name: "DataNotFound" };
      }
      const deleteActivity = await Activity.destroy({
        where: { id },
      });
      res.status(200).json({
        success: true,
        message: "Success Delete Activity",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ActivityController;
